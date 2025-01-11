<template>
  <div>
  <h1>{{student_title}}</h1>
  <ul>
<li v-for="s in students" :key="s.id"> 
<ul>{{ s.firstName }} {{ s.lastName }} {{ s.telephone }} {{ s.email }}</ul>
</li>
  </ul>
  </div>
</template>

<script>
import apiService from '@/service/apiService';
export default {

data(){
  return {
    student_title : 'Liste des étudiants',
    students : [],
  }
},

created(){
  this.getStudentFromBackend();
},

methods: {
async getStudentFromBackend(){
  await apiService.getStudents().then(r=>{
    console.log(r);
    this.students = r.data ;
  })
  .catch(e=>{
    console.error(e);
  })

}
}


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
