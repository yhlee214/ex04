
<template>
	<div class="container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
		<div class="text-center mb-5">
			<h1 class="display-6 fw-bold">아재개그 사전</h1>
			<p class="text-muted">듣고 나면 기빠지거나, 듣고 나면 짜증나는 개그들을 소개합니다</p>
		</div>
 
		<div class="row justify-content-center g-4 w-100">
			<!-- 목록 보기 -->
			<div class="col-12 col-md-5">
				<router-link to="/list" class="text-decoration-none">
					<div class="card h-100 shadow-sm nav-card">
						<div class="card-body text-center py-5">

							<h5 class="card-title fw-bold mt-3 mb-1">아재개그 목록 보기</h5>
							<p class="card-text text-muted small mb-0">
								지금까지 등록된 개그를 구경해보세요
							</p>
						</div>
					</div>
				</router-link>
			</div>
 
			<!-- 등록하기 -->
			
		</div>
	</div>
</template>
 

<script setup>





// ref 반응형 변수, 변수상자를 만들면 template에서 감시할 수 있게 해준다 
// onmounted 화면이 눈에 보여주기전에 한번 실행되는 함수



// 내 간식 목록을 웹서버로 요청하기

</script>



<style scoped>
.nav-card {
	border: 1px solid #eee;
	border-radius: 14px;
	transition: transform 0.15s ease, box-shadow 0.15s ease;
	color: #212529;
}
 
.nav-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
}
 
.nav-icon {
	font-size: 2.5rem;
}
</style>
