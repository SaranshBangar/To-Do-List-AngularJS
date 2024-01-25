import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle : string = ""
  newAppointmentDate : Date = new Date("2019-01-16")

  appointments: Appointment[] = []

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  addAppointment(){
    if (this.newAppointmentTitle.trim().length!==0 && this.newAppointmentDate) {

      let newAppointment: Appointment = {
        id : Date.now(),
        title : this.newAppointmentTitle,
        date : this.newAppointmentDate
      }

      this.appointments.push(newAppointment)

      this.newAppointmentTitle = ""
      this.newAppointmentDate = new Date();

      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }
    else alert("Error, invalid task or date!")
  }

  deleteAppointment(index: number){
    this.appointments.splice(index,1)
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }
}