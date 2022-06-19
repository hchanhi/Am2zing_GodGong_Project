package com.gg.config.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import com.gg.service.PrincipalDetails;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${gg.app.jwtSecret}")
    private String jwtSecret;

    @Value("${gg.app.jwtExpirationMs}")
    private int jwtExpirationInMs;

    // 토큰 생성
    public String generateToken(Authentication authentication) {

        PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);


        // 표준 클레임 셋팅
        return Jwts.builder()
                .setSubject(Long.toString(principalDetails.getId()))
                .setIssuer(principalDetails.getNickname())
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

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            logger.error("JWT 토큰이 유효하지 않습니다.");
        } catch (ExpiredJwtException ex) {
            logger.error("JWT 토큰이 만료되었습니다.");
        } catch (UnsupportedJwtException ex) {
            logger.error("JWT 토큰이 지원되지 않습니다.");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT 클레임이 비어 있습니다.");
        }
        return false;
    }

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}