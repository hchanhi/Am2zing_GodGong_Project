package com.gg.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.gg.domain.Member;
import com.gg.repository.MemberRepository;
import com.gg.controller.PrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;





@Service
public class PrincipalDetailsService implements UserDetailsService{

	@Autowired
	private MemberRepository memberRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String memEmail) throws UsernameNotFoundException {

	        Optional<Member> memberWrapper = memberRepository.findByEmail(memEmail);
	        Member member = memberWrapper.get();
	        List<GrantedAuthority> authorities = new ArrayList<>();
	        authorities.add(new SimpleGrantedAuthority(member.getRole()));
	        return new PrincipalDetails(member);
	    }
	}


