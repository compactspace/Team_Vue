<template>
  <div>
    <PostApplyModal
      v-if="modalState.modalState"
      @applySuccess="refetch()"
      :postIdx="detailValue.postIdx"
      :title="detailValue.title"
      :bizName="bizDetail.bizName"
    />
    <div v-if="isLoading">기다려주세요</div>
    <div v-else>
      <ContextBox> 공고 보기 </ContextBox>

      <div class="div-container">
        <div class="job-details">
          <!-- 지원자 버튼 영역 -->

          <!-- 왼쪽: 채용 정보 -->
          <div class="title-container">
            <h5 id="bizName">
              {{ bizDetail.bizName }}
            </h5>
            <h1 id="postTitle">
              {{ detailValue.title }}
            </h1>
            <hr style="width: 400px" />
          </div>

          <div class="detail-container">
            <div class="detail-header">이런 업무를 해요</div>
            <div>
              <div class="detail-item">ㆍ 업무</div>
              <span id="postDuties" class="detail-describe">
                {{ detailValue.duties }}
              </span>

              <div class="detail-item">ㆍ 포지션 소개</div>
              <span id="postDescription" class="detail-describe">
                {{ detailValue.posDescription }}
              </span>
            </div>
          </div>

          <div class="detail-container">
            <div class="detail-header">이런 조건에서 근무할 예정이에요</div>
            <div>
              <div class="detail-item">ㆍ 급여</div>
              <span class="detail-describe">
                연봉 {{ detailValue.salary }}만원
              </span>

              <div class="detail-item">ㆍ 근무 지역</div>
              <span class="detail-describe">
                {{ detailValue.workLocation }}
              </span>
            </div>
          </div>

          <div class="detail-container">
            <div class="detail-header">이런 분들을 찾고 있어요</div>
            <div class="detail-item">ㆍ 경력</div>
            <span class="detail-describe">
              {{ detailValue.expRequired }}
            </span>

            <div class="detail-item">ㆍ 자격요건</div>
            <span id="postreqQual" class="detail-describe">
              {{ detailValue.reqQualifications }}
            </span>

            <div class="detail-item">ㆍ 우대 사항</div>
            <span class="detail-describe">
              {{ detailValue.prefQualifications }}
            </span>

            <div class="detail-item">ㆍ 모집 인원</div>
            <span class="detail-describe"> {{ detailValue.openings }}명 </span>
          </div>

          <div class="detail-container">
            <div class="detail-header">함께하면 이런 점들이 좋아요</div>
            <div class="detail-item">ㆍ 혜택 & 복지</div>
            <span id="postBenefits" class="detail-describe">
              {{ detailValue.benefits }}
            </span>
          </div>

          <div class="detail-container">
            <div class="detail-header">지원 시 유의해 주세요</div>
            ㆍ 허위 사실이 발견될 경우 채용이 취소될 수 있습니다.
          </div>
        </div>

        <!-- 오른쪽: 버튼 / 기업 정보 -->
        <div class="company-detail">
          <div class="btnGroup-apply" v-if="userInfo.user.userType === `A`">
            <b-button
              v-if="!isClicked.isScraped"
              variant="outline-secondary"
              class="btn-scrap"
              @click="handlerScrap(detailValue.postIdx)"
            >
              <i class="bi bi-star"></i>
            </b-button>
            <b-button
              v-if="isClicked.isScraped"
              variant="outline-secondary"
              class="btn-scrap"
            >
              <i class="bi bi-star-fill"></i>
            </b-button>
            <b-button v-if="isClicked.isApplyed" variant="warning">
              <i class="bi bi-check-all"></i>
              지원 완료
            </b-button>
            <b-button
              v-if="!isClicked.isApplyed"
              variant="warning"
              class="btn-apply"
              @click="
                handlerApplyModal(
                  detailValue.postIdx,
                  detailValue.title,
                  bizDetail.bizName
                )
              "
            >
              지원하기
            </b-button>
            <b-button variant="secondary" @click="() => $router.go(-1)">
              뒤로 가기
            </b-button>
          </div>
          <div
            class="btnGroup-apply"
            v-else-if="userInfo.user.userType === `B`"
          >
            <b-button
              id="btnManagehireUpdate"
              class="btn-edit"
              variant="outline-primary"
              @click="handlerUpdateBtn(detailValue.postIdx)"
            >
              수정
            </b-button>
            <b-button
              id="btnManagehireDelete"
              class="btn-edit"
              variant="outline-danger"
              @click="handlerDeleteBtn"
            >
              삭제
            </b-button>
          </div>
          <div
            class="btnGroup-apply"
            v-else-if="userInfo.user.userType === `M`"
          >
            <b-button
              class="btn-status"
              variant="primary"
              @click="handlerUpdateStatus(detailValue.postIdx, '승인')"
              >승인</b-button
            >
            <b-button
              class="btn-status"
              variant="danger"
              @click="handlerUpdateStatus(detailValue.postIdx, '불허')"
              >불허</b-button
            >
            <b-button variant="secondary" @click="() => $router.go(-1)">
              뒤로 가기
            </b-button>
          </div>
          <b-card
            no-body
            :title="bizDetail.bizName"
            :img-src="bizDetail.logicalPath"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <b-card-body>
              <b-card-title>{{ bizDetail.bizName }}</b-card-title>
              <b-card-text>
                <span id="bizAddr">{{ bizDetail.bizAddr }}</span>
              </b-card-text>
            </b-card-body>
            <b-card-body>
              <b-card-text>
                <b-list-group flush>
                  <b-list-group-item>
                    <i class="bi bi-telephone-fill"></i>
                    연락처: {{ bizDetail.bizContact }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <i class="bi bi-people-fill"></i>
                    직원수: {{ bizDetail.bizEmpCount }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <i class="bi bi-building-fill"></i>
                    대표명: {{ bizDetail.bizCeoName }}
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card-body>
            <b-card-body>
              <b-card-title>
                <i class="bi bi-calendar"></i>
                공고 기간
              </b-card-title>
              <b-card-text>
                <b-list-group flush>
                  <b-list-group-item>
                    <b-badge variant="light">시작일</b-badge>
                    {{ detailValue.startDate }} <br />
                    <b-badge variant="light">마감일</b-badge>
                    {{ detailValue.endDate }}
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card-body>
            <b-card-body style="text-align: center">
              <b-button
                @click="companyDetail(bizDetail.bizIdx)"
                variant="outline-secondary"
              >
                기업 정보 보기
              </b-button>
            </b-card-body>
          </b-card>
          <b-list-group>
            <b-list-group-item @click="fileDownload" style="cursor: pointer">
              <i class="bi bi-download"></i>
              {{ detailValue.fileName }}
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { usePostDetailDeleteMutation } from "../../../../hook/jobs/usePostDetailDeleteMutation";
import { usePostDetailSearchQuery } from "../../../../hook/jobs/usePostDetailSearchQuery";
import { useModalStore } from "../../../../stores/modalState";
import { useUserInfo } from "../../../../stores/userInfo";
import PostApplyModal from "./PostApplyModal.vue";

const { params } = useRoute();
const router = useRouter();
const detailValue = ref({});
const bizDetail = ref({});
const isClicked = ref({});
const userInfo = useUserInfo();
const modalState = useModalStore();

const {
  data: postDetail,
  isLoading,
  isSuccess,
  refetch,
} = usePostDetailSearchQuery(params);

const companyDetail = (bizIdx) => {
  router.push({
    name: "companyDetail",
    params: { bizIdx },
  });
};

const handlerApplyModal = (idx) => {
  detailValue.value.postIdx = idx;
  modalState.setModalState();
};

const handlerScrap = async (postIdx) => {
  await axios
    .post("/prx/api/jobs/saveScrap.do", { postIdx: postIdx })
    .then((res) => {
      refetch();
    });
};

const handlerUpdateStatus = async (postIdx, status) => {
  const params = {
    postIdx: postIdx,
    appStatus: status,
  };

  await axios
    .post("/prx/api/manage-post/statusUpdate.do", params)
    .then((res) => {
      alert("처리되었습니다.");
      refetch();
    });
};

const handlerUpdateBtn = (idx) => {
  router.push({
    name: "hire-post-update",
    params: { idx },
  });
};

const { mutate: handlerDeleteBtn } = usePostDetailDeleteMutation(
  bizDetail.value.bizIdx,
  detailValue.value.postIdx
);

const fileDownload = () => {
  const param = {
    postIdx: detailValue.value.postIdx,
    bizIdx: bizDetail.value.bizIdx,
  };
  const postAction = {
    url: "/prx/api/manage-hire/downloadAttachment.do",
    method: "POST",
    data: param,
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  };

  axios(postAction)
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", detailValue.value.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((err) => {
      alert("파일 다운로드 오류:", err);
    });
};

watchEffect(() => {
  if (isSuccess.value && postDetail.value) {
    detailValue.value = toRaw(postDetail.value.postDetail);
    bizDetail.value = toRaw(postDetail.value.bizDetail);
    isClicked.value = toRaw(postDetail.value.isClicked);
  }
});
</script>

<style lang="scss" scoped>
.backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}
input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 400px;
}
.button-box {
  text-align: right;
  margin-top: 10px;
}
.div-container {
  min-width: 1000px;
  margin: 50px 0px 0px 10px;
}
.job-details {
  float: left;
  width: 60%;
  min-width: 600px;
  margin-bottom: 150px;
}
.company-detail {
  float: right;
  width: 30%;
  min-width: 250px;
  margin-left: 10px;
}
.btnGroup-apply {
  height: 80px;
  float: right;
  text-align: right;
  width: 100%;
}
.mb-2 {
  max-width: 25rem;
}
.wrapped-container {
  min-width: 1200px;
  margin: 3px;
}
.detail-container {
  min-width: 1200px;
  margin: 80px 10px 50px;
}
.btnGroup-bottom {
  text-align: center;
  width: 100%;
  margin-bottom: 30px;
}
.btn {
  margin: 5px;
  font-size: 18px;
}
.detail-header {
  font-size: 23px;
  font-weight: 600;
  margin: 50px 0px 10px;
}
.detail-item {
  margin: 18px 0px 5px;
  font-size: 18px;
  font-weight: 500;
}
.detail-describe {
  margin-left: 20px;
}
.bi-star-fill {
  color: rgb(255, 204, 0);
}
h1 {
  font-weight: 600;
}
.btn-scrap {
  width: 50px;
}
.btn-scrap:hover {
  background-color: #f0f0f0;
  color: rgb(95, 95, 95);
}
.btn-edit,
.btn-status {
  min-width: 80px;
}
</style>
