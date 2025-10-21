<template>
    <div class="w-dwh ml-[302px]">
        <main-nav/>
        <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
                <!--Page titles-->
                <div class="title flex flex-col gap-4">
                    <h1 class="text-2xl font-bold">Calendar & Bookings</h1>
                    <p class="text-gray-500">Manage your appointments and schedule</p>
                </div>

                <!--Page content-->

                <div class="content flex gap-6 w-full">
                    <!--Calendar component-->
                    <div class="cal w-full">
                        <FullCalendar :options="calendarOptions" />
                    </div>

                    <!--Appointments card-->
                    <div class="appointments">
                        <h1 class="mb-4 text-xl font-semibold text-nowrap">{{selectedDateText}}</h1>
                        <!--Appointments cards-->

                        <div class="appCard flex flex-col gap-4">
                            <div class="p-4 rounded-xl bg-white w-[378px] flex flex-col gap-4" v-for="appointment in appointments" :key="appointment" >
                                <!--Appointment top tags-->
                                <div class="tags flex justify-between">
                                    <div class="tele  bg-[#E7F8F8] p-2 rounded-full flex items-center justify-center">
                                        <p class="text-xs text-[#0CB8B6]">{{ appointment.type }}</p>
                                    </div>
                                    <div class="tele  bg-gray-100 p-2 rounded-full flex items-center justify-center">
                                        <p class="text-xs text-gray-500">{{appointment.status}}</p>
                                    </div>
                                </div>

                                <!--Client info and actions-->
                                <div class="client flex justify-between items-start">
                                    <div class="user flex gap-2 items-center">
                                        <div class="img w-10 h-10 rounded-full bg-[#EEF1FF] flex items-center justify-center">
                                            <svg class="w-6 h-6 fill-[#5271FF]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>
                                        </div>
                                        <div class="name flex flex-col gap-2">
                                            <p>{{ appointment.name }}</p>
                                            <div class="date flex gap-2" >
                                                <svg class="w-4 h-4 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>
                                                <p class="text-gray-500 text-xs">{{ appointment.time }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex gap-4"><button v-for="action in appointment.actions" :key="action" :class="getActionClass(action)" class="cursor-pointer">{{ action }}</button></div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import MainNav from '../Layouts/MainNav.vue'

    export default {
        name:"CalenDar",
        components:{MainNav , FullCalendar},
         data() {
        return {
             selectedDateText: this.formatDate(new Date()),
            calendarOptions: {
                plugins: [dayGridPlugin],
                initialView: 'dayGridMonth',
                selectable: true,
                height: 600,
                dateClick: this.handleDateClick,
                headerToolbar: false
            },
            
                appointments:[
                
                    {
                        name:'Mohamed ahmed',
                        time:'08:00 PM',
                        type:'Telemedicine',
                        status:'Confirmed',
                        actions:['Cancel']
                    },
                    {
                        name:'Mohamed ahmed',
                        time:'08:00 PM',
                        type:'Telemedicine',
                        status:'Confirmed',
                        actions:['Reject','Approve']
                    }
             
                ]
        };
    },
    methods:{
          handleDateClick(info) {
                this.selectedDateText = this.formatDate(new Date(info.dateStr))
            },
            formatDate(date) {
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            },
            getActionClass(action) {
            switch (action) {
            case 'Cancel':
                return 'text-red-500 font-medium hover:underline'
            case 'Approve':
                return 'text-green-500 font-medium hover:underline'
            case 'Reject':
                return 'text-red-500 font-medium hover:underline'
            default:
                return ''
            }
        }
    
        }
    }
</script>

<style scoped>

</style>