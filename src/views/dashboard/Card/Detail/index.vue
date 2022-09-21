<template>
  <div>
   <div class="card-header">
     <span>{{title}}</span>
     <svg t="1663394762201" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2401" width="18" height="18"><path d="M523.636364 290.909091m-58.181818 0a1.25 1.25 0 1 0 116.363636 0 1.25 1.25 0 1 0-116.363636 0Z" p-id="2402"></path><path d="M651.636364 768 581.818182 768 581.818182 395.636364 395.636364 395.636364 395.636364 442.181818 465.454545 442.181818 465.454545 768 395.636364 768 395.636364 814.545455 651.636364 814.545455Z" p-id="2403"></path><path d="M1024 512c0-282.763636-229.236364-512-512-512C229.236364 0 0 229.236364 0 512c0 282.763636 229.236364 512 512 512C794.763636 1024 1024 794.763636 1024 512zM46.545455 512C46.545455 254.929455 254.929455 46.545455 512 46.545455s465.454545 208.384 465.454545 465.454545-208.384 465.454545-465.454545 465.454545S46.545455 769.070545 46.545455 512z" p-id="2404"></path></svg>
   </div>
   <div class="card-content">{{count}}</div>
   <div class="card-charts">
     <!-- 插槽 -->
     <slot name="charts"></slot>
   </div>
   <div class="card-footer">
     <!-- 插槽 -->
     <slot name="footer"></slot>
   </div>
   </div>

</template>

<script>
export default {
       name: 'Detail',
       props:['title','count']
}
</script>

<style>
.card-header{
  display: flex;
  justify-content: space-between;
  color:#d9d9d9;
}
 .card-header{
    display: flex;
    justify-content: space-between;
    color:#d9d9d9;
 }
.card-content{
  font-size: 30px;
  padding: 10px 0px;
}
.card-charts{
  height: 50px;
}
.card-footer{
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>