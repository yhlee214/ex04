<template>
    <div class="page-center">
        <div class="container" style="max-width: 1200px;">

            <div class="card shadow-sm border-0">
                <div class="card-body p-4 p-md-5">

                    <div class="text-center mb-4">
                        <h4 class="fw-bold mb-1">아재개그 수정</h4>
                    </div>

                    <!--begin::Form-->

                    <!--begin::Input group (문제)-->
                    <div class="fv-row mb-4">
                        <label class="fs-6 fw-semibold form-label mb-2">
                            <span class="required">문제</span>
                        </label>
                        <textarea v-model="questionInput" class="form-control form-control-solid" rows="3"></textarea>
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group (정답)-->
                    <div class="fv-row mb-5">
                        <label class="required fs-6 fw-semibold form-label mb-2">정답</label>
                        <input v-model="answerInput" type="text" class="form-control form-control-solid" />
                    </div>
                    <!--end::Input group-->


                    <!--begin::Actions-->
                    <div class="d-flex justify-content-center gap-3">
                        <button @click="goToList()" type="reset" class="btn btn-light px-4">취소</button>
                        <button @click="requestGagsModify()" class="btn btn-primary px-4">
                            <span class="indicator-label">등록</span>
                        </button>
                    </div>
                    <!--end::Actions-->

                    <!--end::Form-->
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'

    const router = useRouter() // 라우터 인스턴스(객체) 반환
    const route = useRoute() // 현재 경로 위치를 반환

    const questionInput = ref('')
    const answerInput = ref('')
    
    const selected = ref(null)

    onMounted(() => {
        console.log(`ModifyView::onMounted 호출됨`)

        selected.value = route.query
        questionInput.value = route.query.question
        answerInput.value = route.query.answer
    
    })

    function goToList() {
        router.push({ path: '/list'})
    }

    async function requestGagsModify() {
       try {
  // 웹서버로 요청하기 (GET 방식으로 /api/snack 요청경로로 요청하기)
  const response = await axios({
    method: 'put',
    baseURL: 'http://localhost:7901',
    url: `/api/gags/${selected.value.id}`,
    data: {
        question: questionInput.value,
        answer: answerInput.value
    },
    timeout : 5000,
    responseType: 'json'
  })

  goToList()

console.log(`PUT /api/snack 에 대한 응답 -> ${JSON.stringify(response.data)}`)

} catch(err) {
  console.error(`에러 -> ${err}`)
}

}

</script>
