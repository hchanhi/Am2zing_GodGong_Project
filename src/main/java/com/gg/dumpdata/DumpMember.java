
package com.gg.dumpdata;

import com.gg.domain.Member;
import com.gg.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DumpMember implements CommandLineRunner{

    private final MemberRepository memberRepository;
    
    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void run(String... args) throws Exception {
    	String encPassword = bCryptPasswordEncoder.encode("admin");

                  Member member1 = memberRepository.save(Member.builder()
                    .email("admin@admin.com")
                    .nickname("admin")
                    .password(encPassword)
                    .role("ROLE_ADMIN")
                    .build());
                    
        String encPassword1 = bCryptPasswordEncoder.encode("aaaa");
        Member member2 = memberRepository.save(Member.builder()
                .email("aaaa@aaaa.com")
                .nickname("aaaa")
                .password(encPassword1)
                .birth("1995-01-17")
                .role("ROLE_MEMBER")
                .build());
                }
           }

