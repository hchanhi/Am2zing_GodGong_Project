package com.gg.service;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gg.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


// Spring Security는 객체에 저장된 정보를 사용하여 UserPrincipal인증 및 권한을 부여


public class PrincipalDetails implements UserDetails {
	private Long id;

	private String email;

	private String nickname;

	@JsonIgnore
	private String birth;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public PrincipalDetails(Long id, String email, String nickname, String birth, String password, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.email = email;
		this.nickname = nickname;
		this.birth = birth;
		this.password = password;
		this.authorities = authorities;
	}

	public static PrincipalDetails create(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
				new SimpleGrantedAuthority(role.getName().name())
		).collect(Collectors.toList());

		return new PrincipalDetails(
				user.getId(),
				user.getEmail(),
				user.getNickname(),
				user.getBirth(),
				user.getPassword(),
				authorities
		);
	}

	public Long getId() {
		return id;
	}

	public String getBirth() {
		return birth;
	}

	public String getNickname(){
		return nickname;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
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
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		PrincipalDetails that = (PrincipalDetails) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {

		return Objects.hash(id);
	}
}