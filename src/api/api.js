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
