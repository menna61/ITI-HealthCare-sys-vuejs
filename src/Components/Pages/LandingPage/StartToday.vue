<template>
    <div class="cont">
        <div class="relative img bg-[url('../../../../public/src/startnow.png')] bg-no-repeat bg-cover h-[400px]">
            <div class="absolute overlay bg-[var(--sec-color-500)] w-full h-full inset-0 rounded-[16px] opacity-50"></div>
            <div class="text absolute z-10 flex flex-col gap-4 items-center justify-center h-full w-full text-center">
                <h1 class="text-[56px] font-medium w-[900px] text-white">Ready to Transform Your Healthcare Experience?</h1>
                <button  class="h-12 rounded-lg border border-[var(--sec-color-500)] px-10 text-[var(--sec-color-500)] bg-white font-semibold cursor-pointer hover:bg-[var(--sec-color-500)] hover:text-white transition-all ease-in-out">Start today</button>                
            </div>
        </div>
    </div>  
</template>

<script>
    export default {
        name:"StartToday"
    }
</script>

<style scoped>

</style>