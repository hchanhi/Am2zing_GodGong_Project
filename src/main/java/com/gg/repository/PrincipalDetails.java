package com.gg.repository;

import java.util.ArrayList;
import java.util.Collection;


import com.gg.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

// Authentication 객체에 저장할 수 있는 유일한 타입
public class PrincipalDetails implements UserDetails {// , OAuth2User{

	private static final long serialVersionUID = 1L;
	@Autowired
	private Member member;
	//	private Map<String, Object> attributes;

	// 일반 시큐리티 로그인시 사용
	public PrincipalDetails(Member member) {
		this.member = member;
	}
	
	
	
	public Member getMember() {
		return member;
	}

	@Override
	public String getPassword() {
		return member.getPassword();
	}

	@Override
	public String getUsername() {
		return member.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collet = new ArrayList<GrantedAuthority>();
		collet.add(()->{ return member.getRole();});
		return collet;
	}


	
}
