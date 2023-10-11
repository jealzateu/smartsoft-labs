import { Component } from '@angular/core';

@Component({
  selector: 'app-covid-deaths-us',
  templateUrl: './covid-deaths-us.component.html',
  styleUrls: ['./covid-deaths-us.component.css']
})
export class CovidDeathsUSComponent {

  maxDeathsState: string = '';
  minDeathsState: string = '';
  maxDeathCountByState: number = 0;
  minDeathCountByState: number = 0;

  handleFileInput(event: any): void {
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          this.processCSV(content);
        }
      };
      reader.readAsText(file);
    }
  }

  processCSV(content: string): void {
    const lines = content.split('\n');
    const deathCountByState: { [state: string]: number } = {};
    const validStates = new Set([
      "Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
      "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana",
      "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
      "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon",
      "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ]);
  
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') {
        continue;
      }
      
      const columns = lines[i].split(',');
      const state = columns[6]; // Province_State
      const dateColumns = columns.slice(11);
  
      if (!validStates.has(state)) {
        continue;
      }
  
      const totalDeaths = dateColumns.reduce((acc, deaths) => {
        const deathsNumber = parseInt(deaths.toString() || '0', 10);
        if (!isNaN(deathsNumber)) {
          return acc + deathsNumber;
        } else {
          return acc;
        }
      }, 0);
  
      if (!isNaN(totalDeaths)) {
        if (deathCountByState[state]) {
          deathCountByState[state] += totalDeaths;
        } else {
          deathCountByState[state] = totalDeaths;
        }
      }
    }
  
    const states = Object.keys(deathCountByState);
    this.maxDeathsState = states.reduce((a, b) => (deathCountByState[a] > deathCountByState[b] ? a : b));
    this.minDeathsState = states.reduce((a, b) => (deathCountByState[a] < deathCountByState[b] ? a : b));
    this.maxDeathCountByState = deathCountByState[this.maxDeathsState];
    this.minDeathCountByState = deathCountByState[this.minDeathsState];
  }
  
  
}