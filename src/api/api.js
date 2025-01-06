export const Notice = {
  SearchNoticeList: "/prx/api/board/noticeListJson.do",
  SearchNoticeDetail: "/prx/api/board/noticeDetailBody.do",
  UpdateNoticeDetail: "/prx/api/board/noticeUpdateBody.do",
  InsertNoticeDetail: "/prx/api/board/noticeSaveBody.do",
  DeleteNoticeDetail: "/prx/api/board/noticeDeleteBody.do",
  SearchQnaBoardList: "/prx/api/board/qnaListBody.do",
};

export const Post = {
  SearchPostList: "/prx/api/jobs/readPostList.do",
  SearchPostDetail: "/prx/api/jobs/readPostDetailBody.do",
  DeletePostDetail: "/prx/api/manage-hire/deleteHirePost.do",
};

export const  Withdraw={

    WithdrawConfirm:"/prx/api/mypage/deleteUser.do"

};




export const Scrap = {
  SearchScrapList: "/prx/api/jobs/readScrapList.do",
  UpdateScrap: "/prx/api/jobs/saveScrap.do",
  DeleteScrap: "/prx/api/jobs/deleteScrap.do",
};


export const Applicant={

    ApplicantManagerGetId:"/prx/api/manage-hire/applicant.do",
    ApllicantList:"/prx/api/manage-hire/applicantList.do",
    ApplicantStatusUpdate:"/prx/api/manage-hire/statusUpdate.do"


}


export const  Withdraw={

    WithdrawConfirm:"/prx/api/mypage/deleteUser.do"

}

export const Resume = {
  ReadResumeList: "/prx/api/apply/resumeList.do",
  CopyResumeOne: "/prx/api/apply/resumeCopy.do",
  DeleteResumeOne: "/prx/api/apply/resumeDelete.do",
  DownResumeFile: "/prx/api/apply/fileDownload.do",
  DeleteResumeFile: "/prx/api/apply/deleteFile.do",

  CreateResumeDetail: "/prx/api/apply/resumeNew.do",
  ReadResumeDetail: "/prx/api/apply/resumeDetail.do",
  UpdateResumeDetail: "/prx/api/apply/resumeUpdate.do",

  ReadCareerList: "/prx/api/apply/careerList.do",
  CreateCareerNew: "/prx/api/apply/insertCareer.do",
  DeleteCareerNew: "/prx/api/apply/deleteCareer.do",

  ReadEduList: "/prx/api/apply/educationList.do",
  CreateEduNew: "/prx/api/apply/insertEdu.do",
  DeleteEduNew: "/prx/api/apply/deleteEdu.do",

  ReadSkillList: "/prx/api/apply/skillList.do",
  CreateSkillNew: "/prx/api/apply/insertSkill.do",
  DeleteSkillNew: "/prx/api/apply/deleteSkill.do",

  ReadCertList: "/prx/api/apply/certList.do",
  CreateCertNew: "/prx/api/apply/insertCert.do",
  DeleteCertNew: "/prx/api/apply/deleteCert.do",
};

export const History = {
  ReadHistoryList: "/prx/api/apply/historySearchRest.do",
  CancleHistoryOne: "/prx/apply/cancleApply.do",
};

export const Approval = {
  SearchApprovalList: "/prx/api/manage-post/readPostList.do",
};

export const Login = {
  SignUpIdCheck: "/prx/api/check_loginId.do",
  SignUp: "/prx/api/register.do",
  FindId: "/prx/api/selectFindInfoId.do",
  FindPwd: "/prx/api/selectFindInfoPw.do",
  FindPwdUpdate: "/prx/api/updateFindPw.do",
};

export const Applicant = {
  SearchApplicantList: "/prx/api/manage-user/applicantListBody.do",
  SearchApplicantDetail: "/prx/api/manage-user/applicantManageDetail.do",
  ResetApplicantPw: "/prx/api/manage-user/applicantPwReset.do",
  UpdateApplicantDetail: "/prx/api/manage-user/applicantInfoUpdate.do",
  ApplicantManagerGetId:"/prx/api/manage-hire/applicant.do",
  ApllicantList:"/prx/api/manage-hire/applicantList.do",
  ApplicantStatusUpdate:"/prx/api/manage-hire/statusUpdate.do",
  ApplicantResumeIndependent:"prx/api/apply/resumeDetail",
  ApplicantcareerListIndependent:"/prx/api/apply/careerList",
  ApplicantEducationListtIndependent:"/prx/api/apply/educationListt",
  ApplicantskillListIndependent:"/prx/api/apply/skillList",
};

export const Biz = {
  SearchBizList: "/prx/api/manage-user/bizList.do",
  SearchBizDetail: "/prx/api/manage-user/bizManageDetail.do",
  UpdateBizDetail: "/prx/api/manage-user/bizInfoUpdate.do",
};
