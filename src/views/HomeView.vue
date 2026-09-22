<template>
	<div class="container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
		<div class="text-center mb-5">
			<h1 class="display-4 fw-bold" style="mb-12">아재개그 사전</h1>
			<p class="text-muted fs-3">10대,20대 젊은이들을 당황하게 만드는 옛날식 유머, 어느 포인트에서 </p>
			<p class="text-muted fs-3">
				웃어야 할지 잘 모르고 짜증나고 힘이 빠지는, 하지만 정작 개그 치는 사람 혼자 재밌다고 해서</p>
			<p class="text-muted fs-3">'아재 개그'라고 합니다.</p>
		</div>

		<div class="row justify-content-center g-4 w-100">
			<!-- 목록 보기 -->
			<div class="col-12 col-md-5">
				<router-link to="/list" class="text-decoration-none">
					<div class="card h-100 shadow-sm nav-card">
						<div class="card-body text-center py-5">

							<h5 class="card-title fw-bold mt-3 mb-1 fs-2">아재개그 목록 보기</h5>
							<p class="card-text text-muted small mb-0 fs-4">
								지금까지 등록된 개그를 구경해보세요
							</p>
						</div>
					</div>
				</router-link>
			</div>
			<div class="col-12 col-md-5">
				<router-link to="/quiz" class="text-decoration-none">
					<div class="card h-100 shadow-sm nav-card">
						<div class="card-body text-center py-5">

							<h5 class="card-title fw-bold mt-3 mb-1 fs-2">아재개그 퀴즈 풀기</h5>
							<p class="card-text text-muted small mb-0 fs-4">
								퀴즈를 풀어보세요.
							</p>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>


<script setup>


</script>



<style>

</style>
