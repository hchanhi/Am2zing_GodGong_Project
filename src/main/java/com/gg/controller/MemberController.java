package com.gg.controller;

import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.gg.domain.Member;
import com.gg.repository.MemberRepository;
import com.gg.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import lombok.RequiredArgsConstructor;



@Controller
@RequiredArgsConstructor

public class MemberController {

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private MemberService memberService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	

//	//멤버 메인 페이지 -> 추후 경로 수정 예정 
//	@GetMapping({ "/member" })
//	public String index() {
//		return "member/index";
//	}

	//로그인 페이지 이동
	@GetMapping("/member/login")
	 public String goLogin(HttpServletRequest request) {
        //이전 페이지의 정보
        String url = request.getHeader("Referer");
        if(!url.contains("member/member_loginForm")) {
            request.getSession().setAttribute("prevPage",request.getHeader("Referer"));
        }
		return "member/member_loginForm"; 
		} 
	
	/* 로그인 에러 *

	*/
    @PostMapping("member/login")
    public String loginError(HttpServletRequest request, Model model) {
        String loginFailMsg = (String) request.getAttribute("loginFailMsg");
        model.addAttribute("loginFailMsg",loginFailMsg);
        return "member/member_loginForm";
    }

	@GetMapping("member/join")
	public String join() {

		return "member/member_joinForm";
	}
	
	//마이페이지
	@GetMapping("member/mypage")
    public String mypage(Authentication authentication, Model model) {
        Member member = memberService.mypage(authentication.getName());
        model.addAttribute("member",member);

        return "member/member_mypage";
    }
	


	 //내정보 수정
    @PostMapping("member/myinfoEdit")
    public String memberUpdate(Member member) {
        memberService.updateMember(member);
        return "member/member_mypage";
    }

	//회원가입 진행
	@PostMapping("/joinProc")
	public String joinProc(Member member) {
		
		String rawPassword = member.getPassword();
		String encPassword = bCryptPasswordEncoder.encode(rawPassword);
		member.setPassword(encPassword);
		member.setRole("ROLE_MEMBER");
		memberRepository.save(member);
		return "member/member_loginForm";
	}
	
	//회원가입 이메일 중복 체크
	@ResponseBody
    @GetMapping("/member/emailChk")
    public HashMap<String, Object> memEmailCheck(@RequestParam(value = "memEmail", required = false) String memEmail) {
		System.out.println(memberService.memEmailCheck(memEmail));
        return memberService.memEmailCheck(memEmail);
    }
	
	//회원가입 닉네임 중복 체크
    @ResponseBody
    @GetMapping("/member/nicknameChk")
    public HashMap<String, Object> memNicknameCheck(@RequestParam(value = "memNickname", required = false) String memNickname) {
        return memberService.memNicknameCheck(memNickname);
    }
    
    //닉네임 수정 중복 체크
    @ResponseBody
    @GetMapping("/member/nicknameEdit")
    public HashMap<String, Object> memNicknameEdit(@RequestParam(required = false) Long memId, String memNickname) {
        return memberService.memNicknameEdit(memNickname, memId);
    }
    
    
    //패스워드 수정페이지
    @GetMapping("/member/pwdEdit")
    public String EditPassword(Authentication authentication, Model model) {
    	Member member = memberService.mypage(authentication.getName());
    	model.addAttribute("member",member);

        return "member/member_pwd_edit";
    }
    
    //패스워드 확인
    @ResponseBody
    @GetMapping("/member/pwdCheck")
    public HashMap<String, Object> pwCheck(@RequestParam(required = false) String original_Pw, Authentication authentication) {
        return memberService.pwCheck(authentication,original_Pw);
    }
    

    //패스워드 변경
    @PostMapping("/member/pwdEdit")
    public String pwdUpdate(Authentication authentication,Member member) {
        member.setEmail(authentication.getName());
        memberService.passwordUpdate(member);
        return "redirect:/logout";
    }

    
    //회원 탈퇴 실행
    @PostMapping("/memeber/withdrawal")
    public String withdrawalMember(Member member, HttpSession session) {

    	memberService.deleteMember(member.getId());
        session.invalidate();
        return "redirect:/";
    }
}
