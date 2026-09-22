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

			<!--begin::Table container-->
			<div class="table-responsive">
				<!--begin::Table-->
				<table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
					<!--begin::Table head-->
					<thead>
						<tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
							<th class="p-0 pb-3 min-w-100px text-start">글번호</th>
							<th class="p-0 pb-3 min-w-300px text-center">질문</th>
							<th class="p-0 pb-3 min-w-150px text-center">답</th>
							<th class="p-0 pb-3 min-w-120px text-end">시간</th>
							<th class="p-0 pb-3 min-w-120px text-end">관리</th>
						</tr>
					</thead>
					<!--end::Table head-->
					<!--begin::Table body-->
					<tbody>
						<tr v-if="gags.length === 0">
							<td colspan="5" class="text-center text-gray-500 py-8">
								등록된 개그가 없습니다.
							</td>
						</tr>
						<tr v-for="item in pagedGags" :key="item.id">
							<td>
								<div class="d-flex align-items-center">
									<div class="d-flex justify-content-start flex-column">
										<span class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">{{ item.id
											}}</span>
									</div>
								</div>
							</td>
							<td class="text-center pe-4">
								<span class="text-gray-600 fw-bold fs-6">{{ item.question }}</span>
							</td>
							<td class="text-center p-0">
								<span class="badge badge-light-success fs-base"
								 style="cursor: pointer;"
								 @click="toggleAnswer(item.id)">
									<i class="ki-duotone ki-arrow-up fs-5 text-success ms-n1">
									</i>{{ showAnswer(item.id) ? item.answer : '?' }}
								</span>
							</td>
							<td class="text-end">
								<span>{{ item.reg_date }}</span>
							</td>
							<td class="text-end">
								<button type="button" class="btn btn-sm btn-light-primary me-2"
									@click="showModifyGagsPage(item)">
									수정
								</button>
								<button type="button" class="btn btn-sm btn-light-danger"
									@click="requestGagRemove(item.id)">
									삭제
								</button>
							</td>
						</tr>
					</tbody>
					<!--end::Table body-->
				</table>
			</div>
			<!--end::Table-->

			<!--begin::Pagination-->
			<footer v-if="gags.length > 0" class="list-footer">
				<div class="result-count" aria-live="polite">
					<strong>{{ firstItem }}–{{ lastItem }}</strong> / {{ gags.length }}개
				</div>

				<nav class="pagination" aria-label="페이지 이동">
					<button aria-label="첫 페이지" :disabled="currentPage === 1" @click="goToPage(1)">
						«
					</button>
					<button aria-label="이전 페이지" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
						‹
					</button>
					<button v-for="number in visiblePages" :key="number" type="button"
						:class="{ active: number === currentPage }"
						:aria-current="number === currentPage ? 'page' : undefined"
						:aria-label="`${number} 페이지`" @click="goToPage(number)">
						{{ number }}
					</button>
					<button aria-label="다음 페이지" :disabled="currentPage >= displayTotalPages"
						@click="goToPage(currentPage + 1)">
						›
					</button>
					<button aria-label="마지막 페이지" :disabled="currentPage >= displayTotalPages"
						@click="goToPage(displayTotalPages)">
						»
					</button>
				</nav>

				<label class="page-size">
					표시 개수
					<select :value="pageSize" aria-label="페이지 크기" @change="changePageSize">
						<option :value="10">10개</option>
						<option :value="20">20개</option>
						<option :value="50">50개</option>
					</select>
				</label>
			</footer>
			<!--end::Pagination-->

		</div>
		<!--end: Card Body-->



	</div>
</template>

<script setup>

import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

// ref 값을 넣어서 값이 바뀌면 그걸 쓰고 있는 화면이 자동으로 다시 그려지게 됨.
const gags = ref([]);
const router = useRouter()


const showIds = ref()

function toggleAnswer(id) {
	if (showIds.value.has(id)) {
		showIds.value.delete(id)
	} else {
		showIds.value.add(id)
	}
	
	showIds.value = new Set(showIds.value)
}

function showAnswer(id) {
	return showIds.value.has(id)
}



// --- 클라이언트단 페이지네이션 상태 ---
// 서버는 /api/gags 로 전체 목록을 한 번에 내려주므로, 여기서는 받아온 배열을
// 화면에서만 나눠 보여준다. 서버 요청은 페이지가 바뀌어도 다시 보내지 않는다.
const currentPage = ref(1);
const pageSize = ref(10);

// computed 자동으로 다시 계산되는 값
const totalPages = computed(() => Math.ceil(gags.value.length / pageSize.value));
// 결과가 0건이어도 페이지 번호 표시는 최소 1페이지로 보여준다.
const displayTotalPages = computed(() => Math.max(1, totalPages.value));

const pagedGags = computed(() => {
	const start = (currentPage.value - 1) * pageSize.value;
	return gags.value.slice(start, start + pageSize.value);
});

const firstItem = computed(() =>
	gags.value.length ? (currentPage.value - 1) * pageSize.value + 1 : 0,
);
const lastItem = computed(() =>
	Math.min(currentPage.value * pageSize.value, gags.value.length),
);

// 현재 페이지 주변 버튼을 최대 5개까지만 보여준다.
const visiblePages = computed(() => {
	const count = Math.min(5, displayTotalPages.value);
	const start = Math.max(1, Math.min(currentPage.value - 2, displayTotalPages.value - count + 1));
	return Array.from({ length: count }, (_, index) => start + index);
});

function goToPage(page) {
	const target = Math.min(Math.max(1, page), displayTotalPages.value);
	currentPage.value = target;
}

function changePageSize(event) {
	pageSize.value = Number(event.target.value);
	currentPage.value = 1;
}

// 삭제 등으로 목록이 줄어들어 현재 페이지가 더 이상 존재하지 않으면
// (예: 마지막 페이지의 마지막 한 줄을 삭제한 경우) 마지막 유효 페이지로 되돌린다.
watch(displayTotalPages, (newTotalPages) => {
	if (currentPage.value > newTotalPages) {
		currentPage.value = newTotalPages;
	}
});

function goToAdd() {
	router.push({ path: '/add' })
}

function showModifyGagsPage(item) {
	console.log(`showModifyGagsPage 호출됨 -> ${item.id}`)
	console.log(`선택된 개그 -> ${JSON.stringify(item)}`)

	goToModifyGagsPage(item)
}

function goToModifyGagsPage(selectedItem) {

	router.push({ path: '/modify', query: selectedItem })

}

onMounted(() => {

	console.log(`땜빵 AboutView 페이지에서 onMounted 함수 호출되었습니다.`);

	getGagsList();
});

async function getGagsList() {

	const response = await axios({
		method: 'get',
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

/* --- 페이지네이션 --- */
.list-footer {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin-top: 16px;
	padding-top: 16px;
	border-top: 1px solid #eee;
}

.result-count {
	font-size: 0.85rem;
	color: #7e8299;
}

.pagination {
	display: flex;
	gap: 4px;
}

.pagination button {
	min-width: 32px;
	height: 32px;
	border: 1px solid #e4e6ef;
	background-color: #fff;
	border-radius: 6px;
	font-weight: 600;
	font-size: 0.85rem;
	color: #5e6278;
	cursor: pointer;
	transition: background-color 0.15s ease;
}

.pagination button:hover:not(:disabled) {
	background-color: #f4f4f4;
}

.pagination button:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

.pagination button.active {
	background-color: #3699ff;
	border-color: #3699ff;
	color: #fff;
}

.page-size {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 0.85rem;
	color: #7e8299;
}

.page-size select {
	padding: 6px 8px;
	border: 1px solid #e4e6ef;
	border-radius: 6px;
	font-size: 0.85rem;
	background-color: #fff;
}
</style>