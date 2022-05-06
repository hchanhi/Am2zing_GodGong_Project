package com.gg.service;

import java.util.HashMap;
import java.util.List;


import com.gg.domain.Member;
import com.gg.repository.MemberCustomRepository;
import com.gg.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private MemberCustomRepository memberCustomRepository;

	public Member memberInfo(String email) {
		Member member = memberCustomRepository.findByMemEmail(email);
		return member;
	}
	
	

	// 이메일 중복 검사
	public HashMap<String, Object> memEmailCheck(String email) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("result", memberRepository.existsByEmail(email));
		return map;
	}

	// 닉네임 중복 검사
	public HashMap<String, Object> memNicknameCheck(String nickname) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("result", memberRepository.existsByNickname(nickname));
		return map;
	}
	
	//닉네임 수정 중복 검사
    public HashMap<String, Object> memNicknameEdit(String nickname, Long id) {
        List<String> findMemNickname = memberCustomRepository.findExistMemNickname(id);

        HashMap<String, Object> map = new HashMap<>();
        map.put("result", findMemNickname.contains(nickname));
        System.out.println("result");
        return map;
    }
	
	
    
    //마이페이지 정보 
    public Member mypage(String memEmail) {
        Member member = memberCustomRepository.findByMemEmail(memEmail);
        return member;
    }
    
    //내정보 수정
    public void updateMember(Member member) {
        memberCustomRepository.updateMember(member);
    }
    
    //패스워드 변경 전 기존 패스워드 검사
    public HashMap<String, Object> pwCheck(Authentication authentication, String original_Pw) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String db_Pw = memberInfo(authentication.getName()).getPassword();
        HashMap<String, Object> map = new HashMap<>();
        map.put("result", passwordEncoder.matches(original_Pw, db_Pw));
        return map;
    }
    
    //패스워드 변경
    public void passwordUpdate(Member member) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        memberCustomRepository.updateMemPassword(member);
    }
    
    // 회원 탈퇴
    public void deleteMember(Long memId) {    
        memberRepository.deleteById(memId);
    }

    
 
		
	}

