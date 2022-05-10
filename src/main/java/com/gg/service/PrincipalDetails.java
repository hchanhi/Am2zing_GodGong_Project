package com.gg.service;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gg.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class PrincipalDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private Long id;

	private String nickname;
	private String email;
	private String birth;
	@JsonIgnore
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	public PrincipalDetails(Long id, String nickname, String email, String password,String birth,
						   Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.birth = birth;
		this.authorities = authorities;
	}
	public static PrincipalDetails create(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());
		return new PrincipalDetails(
				user.getId(),
				user.getNickname(),
				user.getEmail(),
				user.getBirth(),
				user.getPassword(),
				authorities);
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	public Long getId() {
		return id;
	}
	public String getEmail() {
		return email;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return nickname;
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
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		PrincipalDetails user = (PrincipalDetails) o;
		return Objects.equals(id, user.id);
	}
}

