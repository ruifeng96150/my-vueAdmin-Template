<template>
  <div>
    {{title}}
    <ac-table :cfg="datas">
    </ac-table>
  </div>
</template>
<script>

  import AcTable from "@/components/AcTable/AcTable";

  export default {
    components:{AcTable},
    data() {
      return {
        title:this.$route.query.title,
        datas:{
          url:'table/list',
          param:{
            name:'sss',
            tid:this.$route.query.id
          }
        },

      }
    }
  }
</script>

<style scoped>

</style>
