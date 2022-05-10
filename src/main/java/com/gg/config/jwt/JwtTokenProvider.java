package com.gg.config.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import com.gg.service.PrincipalDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${gg.app.jwtSecret}")
    private String jwtSecret;

    @Value("${gg.app.jwtExpirationMs}")
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication) {

        PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(principalDetails.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(getSignKey())
                .compact();
    }

    public Long getUserIdFromJWT(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

		/*
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(jwtSecret)
			.parseClaimsJws(token)
			.getBody();*/

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}