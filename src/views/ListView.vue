<template>
	<div class="container">
		<!--begin::Header-->
		<div class="card-header pt-7">
			<!--begin::Title-->
			<h3 class="card-title align-items-start flex-column">
				<span class="card-label fw-bold text-gray-800">아재개그 사전</span>
			</h3>
			<!--end::Title-->
			<!--begin::Toolbar-->
			<div class="card-toolbar">
				<button type="button" class="btn btn-primary" @click="goToAdd()">
					+ 새 개그 등록
				</button>
			</div>
			<!--end::Toolbar-->
		</div>
		<!--end::Header-->
 
		<!--begin::Body-->
		<div class="card-body pt-6">
 
			<!--begin::Loading-->
			
 
			<!--begin::Table container-->
			<div class="table-responsive">
				<!--begin::Table-->
				<table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
					<!--begin::Table head-->
					<thead>
						<tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
							<th class="p-0 pb-3 min-w-100px text-start">글번호</th>
							<th class="p-0 pb-3 min-w-300px text-center">문제</th>
							<th class="p-0 pb-3 min-w-150px text-center">정답</th>
							<th class="p-0 pb-3 min-w-120px text-end">시간</th>
							<th class="p-0 pb-3 min-w-120px text-end">관리</th>
						</tr>
					</thead>
					<!--end::Table head-->
					<!--begin::Table body-->
					<tbody>
						<tr v-for="(item, index) in gags":key="item.id">
							<td>
								<div class="d-flex align-items-center">
									<div class="d-flex justify-content-start flex-column">
										<span class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">{{ item.id }}</span>
									</div>
								</div>
							</td>
							<td class="text-center pe-4">
								<span class="text-gray-600 fw-bold fs-6">{{ item.question }}</span>
							</td>
							<td class="text-center p-0">
								<span class="badge badge-light-success fs-base">
									<i class="ki-duotone ki-arrow-up fs-5 text-success ms-n1">
										
									</i>{{ item.answer }}
								</span>
							</td>
							<td class="text-end">
								<span>{{ item.reg_date }}</span>
							</td>
							<td class="text-end">
								<button type="button" class="btn btn-sm btn-light-primary me-2" @click="showModifyGagsPage(index, itemId)(index, item.id)">
									수정
								</button>
								<button type="button" class="btn btn-sm btn-light-danger" @click="requestGagRemove(item.id)">
									삭제
								</button>
							</td>
						</tr>
					</tbody>
					<!--end::Table body-->
				</table>
			</div>
			<!--end::Table-->
		</div>
		<!--end: Card Body-->
 
		
 
	</div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const gags = ref([]);
const router = useRouter()

function goToAdd() {
    router.push({ path: '/add' })
}

function showModifyGagsPage(index, itemId) {
  console.log(`showModifySnackPage 호출됨 ->${index} ${itemId}`)
  console.log(`선택된 스낵 -> ${JSON.stringify(gags.value[index])}`)

  goToModifyGagsPage(gags.value[index])
}

function goToModifyGagsPage(selectedItem) {

  router.push({ path: '/modify', query: selectedItem })

}

onMounted(()=> {

	console.log(`땜빵 AboutView 페이지에서 onMounted 함수 호출되었습니다.`);

	getGagsList();
});

async function getGagsList() {

	const response = await axios({
		method:'get',
		baseURL: 'http://localhost:7901',
		url: `/api/gags`,
		data: {},
		timeout: 5000,
		responseType: 'json'
	});

	console.log(`/api/board 에 대한 response : ${JSON.stringify(response.data)}`);

	gags.value = response.data.data;

}

async function requestGagRemove(id) {
        try {
            // 웹서버로 요청하기 (DELETE 방식으로 /api/gags/:id 요청경로로 요청하기)
            const response = await axios({
                method: 'delete',
                baseURL: 'http://localhost:7901',
                url: `/api/gags/${id}`,
                data: {
                },
                timeout: 5000,
                responseType: 'json'
            })
 
			getGagsList()
 
            console.log(`DELETE /api/gags 에 대한 응답 -> ${JSON.stringify(response.data)}`)
 
        } catch (err) {
            console.error(`에러 -> ${err}`)
        }
    }


</script>

 
<style scoped>
.container {
	max-width: 960px;
	margin: 0 auto;
	padding: 24px;
}
 
.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	padding-bottom: 16px;
	margin-bottom: 16px;
}
 
.card-title {
	display: flex;
	flex-direction: column;
	gap: 2px;
}
 
.card-label-icon {
	font-size: 1.8rem;
	line-height: 1;
	margin-bottom: 4px;
}
 
.card-label {
	font-size: 1.6rem;
	font-weight: 800;
	background: linear-gradient(90deg, #3699ff, #7239ea);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	letter-spacing: -0.5px;
}
 
.card-sub {
	font-size: 0.85rem;
	color: #a1a5b7;
	font-weight: 500;
}
 
.table {
	width: 100%;
	border-collapse: collapse;
}
 
.table th,
.table td {
	padding: 12px 8px;
}
 
.table tbody tr {
	border-bottom: 1px dashed #e4e6ef;
	transition: background-color 0.15s ease;
}
 
.table tbody tr:hover {
	background-color: #f9f9fb;
}
 
.badge {
	display: inline-flex;
	align-items: center;
	padding: 6px 12px;
	border-radius: 6px;
	font-weight: 600;
}
 
.badge-light-success {
	background-color: #e8fff3;
	color: #50cd89;
}
 
.btn {
	border: none;
	border-radius: 6px;
	padding: 8px 16px;
	font-weight: 600;
	cursor: pointer;
	transition: opacity 0.15s ease;
}
 
.btn:hover {
	opacity: 0.85;
}
 
.btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
 
.btn-sm {
	padding: 6px 10px;
	font-size: 0.85rem;
}
 
.btn-primary {
	background-color: #3699ff;
	color: #fff;
}
 
.btn-light {
	background-color: #f4f4f4;
	color: #333;
}
 
.btn-light-primary {
	background-color: #eef6ff;
	color: #3699ff;
}
 
.btn-light-danger {
	background-color: #fff5f8;
	color: #f1416c;
}
 

.form-label {
	display: block;
	margin-bottom: 6px;
	font-size: 0.9rem;
}
 
.form-control {
	width: 100%;
	box-sizing: border-box;
	padding: 10px 12px;
	border: 1px solid #e4e6ef;
	border-radius: 6px;
	font-size: 0.95rem;
	font-family: inherit;
}
 
.form-control:focus {
	outline: none;
	border-color: #3699ff;
}
 
.text-danger {
	color: #f1416c;
}
</style>
 