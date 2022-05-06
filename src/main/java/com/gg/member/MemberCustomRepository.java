package com.gg.member;

import java.util.List;

import javax.transaction.Transactional;

import com.gg.domain.Member;
import com.gg.domain.QMember;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class MemberCustomRepository {

	 private final JPAQueryFactory queryFactory;

	 public Member findByMemEmail(String email) {
	        return queryFactory.selectFrom(QMember.member)
	                .where(QMember.member.email.eq(email))
	                .fetchOne();
	    }


    //본인 제외한 닉네임 중복 검사
   public List<String> findExistMemNickname(Long id){
	   return queryFactory.select(QMember.member.nickname)
			   .from(QMember.member)
			   .where(QMember.member.id.ne(id))
			   .fetch();
    }

   //본인것 제외한 닉네임 찾기
   public QueryResults<String> findExistNickname(Long id) {
       return queryFactory.select(QMember.member.nickname)
               .from(QMember.member)
               .where(QMember.member.id.ne(id))
               .fetchResults();
   }

    /*회원정보 수정*/
    @Transactional
    public void updateMember(Member member) {
        queryFactory.update(QMember.member)
                .set(QMember.member.id, member.getId())
                .set(QMember.member.email, member.getEmail() )
                .set(QMember.member.nickname, member.getNickname())
                .set(QMember.member.birth, member.getBirth())
                .set(QMember.member.role, member.getRole())
                .where(QMember.member.id.eq(member.getId()))
                .execute();
    }

    @Transactional
    public void updateMemPassword(Member member) {
        queryFactory.update(QMember.member)
                .set(QMember.member.password, member.getPassword())
                .where(QMember.member.email.eq(member.getEmail()))
                .execute();
    }


}