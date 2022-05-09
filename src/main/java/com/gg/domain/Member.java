package com.gg.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor


public class Member {
	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String email;
	private String password;
	private String birth;

	@Column(unique = true)
	private String nickname;

	private String role; //ROLE_MEMBER, ROLE_ADMIN

	@CreationTimestamp
	private Timestamp createDate;
	
	public void encodePassword(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.password);
	}

	public Member update(String nickname){
		this.nickname = nickname;

		return this;
	}

}
