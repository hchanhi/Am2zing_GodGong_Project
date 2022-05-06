package com.gg.repository;


import com.gg.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository 를 상속하면 자동 컴포넌트 스캔됨.
public interface MemberRepository extends JpaRepository<Member, Long> {
	// SELECT * FROM user WHERE username = ?1
	
	Optional<Member> findByEmail(String email);
	
//	// SELECT * FROM user WHERE provider = ?1 and providerId = ?2
//	Optional<Member> findByProviderAndProviderId(String provider, String providerId);
	
	//중복 검사 
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

	Member findByNickname(String nickname);
	Optional<Member> findById(Long id);

//	Member updateMemPassword(Member memPassword);

    
    
   
    
    
   
    
	
}


