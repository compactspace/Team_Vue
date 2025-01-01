import { createRouter, createWebHistory } from "vue-router";
import ResumeFrame from "../components/page/Apply/Resume/ResumeFrame.vue";
import NoticeDetail from "../components/page/Board/Notice/NoticeDetail.vue";
import CompanyDetail from "../components/page/Company/CompanyDetail.vue";
import HirePostEditor from "../components/page/Hire/HirePostEditor.vue";
import QnaDetailModal from "../components/page/Qna/QnaDetailModal.vue";
import ApprovalPost from "../views/Approval/ApprovalPost.vue";
import Notice from "../views/Board/Notice.vue";
import DashBoard from "../views/DashBoard/DashBoard.vue";
import HirePost from "../views/Hire/HirePost.vue";
import Post from "../views/Jobs/Post.vue";
import Login from "../views/Login/Login.vue";
import ManageApplicant from "../views/ManageUser/ManageApplicant.vue";
import ManageBiz from "../views/ManageUser/ManageBiz.vue";
import Qna from "../views/Qna/QuesnAnsw.vue";
import Resume from "../views/Apply/Resume/Resume.vue";
import History from "../views/Apply/History/History.vue";

import Applicant from "../views/Applicant/Applicant.vue";
import Withdraw from "../views/Withdraw/Withdraw.vue";
import path from "path";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/vue",
    name: "vue",
    component: DashBoard,
    children: [
      {
        path: "board",
        name: "board",
        children: [
          {
            path: "notice.do",
            name: "notice",
            component: Notice,
          },
          {
            path: "notice.do/:idx",
            name: "noticeDetail",
            component: NoticeDetail,
          },
          {
            path: "notice.do/insert",
            name: "noticeInsert",
            component: NoticeDetail,
          },

          {
            path: "qna.do",
            qna: "qna",
            component: Qna,
          },

          {
            path: "qnaInsert.do/insert",
            qna: "qnaInsert",
            component: QnaDetailModal,
          },
        ],
      },
      {
        path: "apply",
        name: "apply",
        children: [
          {
            path: "resume.do",
            name: "resume",
            component: Resume,
          },
          {
            path: "resume-detail.do",
            name: "resumeDetail",
            component: ResumeFrame,
          },
          {
            path: "history.do",
            name: "history",
            component: History,
          },
        ],
      },
      {
        path: "jobs",
        name: "jobs",
        children: [
          {
            path: "posts.do",
            name: "post",
            component: Post,
          },
        ],
      },
      {
        path: "manage-hire",
        name: "manage-hire",
        children: [
          {
            path: "post.do",
            name: "hire-post",
            component: HirePost,
          },
          {
            path: "editor.do",
            name: "hire-post-create",
            component: HirePostEditor,
          },

          {
            path:"applicant.do",
            name: "applicantList",
            component:Applicant,
          }


        ],
      },
      {
        path: "manage-post",
        name: "manage-post",
        children: [
          {
            path: "approval.do",
            name: "approval-post",
            component: ApprovalPost,
          },
        ],
      },
      {
        path: "company",
        name: "company",
        children: [
          {
            path: "companyDetail.do/:bizIdx",
            name: "companyDetail",
            component: CompanyDetail,
          },
        ],
      },
      {
        path: "manage-user",
        name: "manage-user",
        children: [
          {
            path: "applicant.do",
            name: "manageApplicant",
            component: ManageApplicant,
          },
          {
            path: "biz.do",
            name: "manageBiz",
            component: ManageBiz,
          },
        ],
      },


      {
        path:'mypage',
        name:"mypage",
        children:[

            {

                path:"withdraw.do",
                name:"withdraw",
                component:Withdraw
                
                }
        ]


      }



      
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
