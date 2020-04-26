/*Heather Sleyster
sleyster_a07bpart2
Thoendel
INFO 2134
04/23/2020
*/

window.addEventListener('load', () => {
    const right = document.getElementById('right');
    const left = document.getElementById('left');

displayLoading('left', 'Loading employee list ...');

const url = 'https://www.mccinfo.net/epsample/employees';

fetch(url)
    .then (response => response.json() )
        .then ( (employees => {
            console.log(employees);

            let para = document.createElement('p');
            para.innerHTML = 'Select an employee from the list below: ';

            let employeeList = document.createElement('select');
            employeeList.id = 'employeeList';

            let option = document.createElement('option');
            option.value = '';
            option.innerHTML = '--Select an option--';
            employeeList.appendChild(option);

            for(const employee of employees){
                option = document.createElement('option');
                option.value = employee.id;
                option.innerHTML = `${employee.first_name} ${employee.last_name} (${employee.department.name})`;
                employeeList.appendChild(option); 
            }
            clearContainer('left');
            left.appendChild(para);
            left.appendChild(employeeList);

            employeeList.addEventListener('change', onChange);
        //Begin Step 2
            employeeList.addEventListener('select', displayEmployeeInfo('right', employeeList.first_name, 
            employeeList.last_name, employeeList.department.name, employeeList.annual_salary, employeeList.hire_date));       
        //End Step 2
        })

        //Begin Step 3

const imageUrl = 'https://mccinfo.net/epsample/images/' + employeeList.last_name + '.jpg';

        fetch(imageUrl)
            .then ((response ) => {
                if(response.ok) {
            let image = document.createElement('img');
            image.innerHTML = imageUrl;
            right.appendChild(image);
                }
                })  
        //End Step 3
              
        

//Helper functions
    function clearContainer(side){
        switch(side){
            case 'right':
                right.innerHTML = '';
                break;
            case 'left':
                left.innerHTML = '';
                break;
        }
    }

    function displayLoading(side, loadingText){
        if(loadingText == undefined) loadingText = 'Loading content ...';
        if((side != 'left') && (side !=' right')){
            throw new Error ('displayLoading accepts "right" or "left"');
        } else {
            const container = document.getElementById(side);

            let loadingTextContainer = document.createElement('p');
            loadingTextContainer.innerHTML = loadingText;
            container.appendChild(loadingTextContainer);

            let loadingImageContainer = document.createElement('div');
            loadingImageContainer.classList.add('loading');
            loadingImageContainer.classList.add('centered');
            container.appendChild(loadingImageContainer);
        }
    }

    function onChange(evt){
        console.log(evt.target.value);  
    }
//Step 2 Helper Function
    function displayEmployeeInfo(side, fNameInfo, lNameInfo, department, salary, hireDate){
        if ((side != 'left') && (side != 'right')){
            throw new Error ('Error: displayEmployeeInfo accepts "right" and "left"');
        } 
        else {
            const recordContainer = document.getElementById(side);
            
            let recordFirstNameContainer = document.createElement('h1');
            recordFirstNameContainer.innerHTML = fNameInfo;
            recordContainer.appendChild(recordFirstNameContainer);

            let recordLastNameContainer = document.createElement('h1');
            recordLastNameContainer.innerHTML = lNameInfo;
            recordContainer.appendChild(recordLastNameContainer);

            let recordDepartmentContainer = document.createElement('h2');
            recordDepartmentContainer.innerHTML = department;
            recordContainer.appendChild(recordDepartmentContainer);

            let recordSalaryContainer = document.createElement('h2');
            recordSalaryContainer.innerHTML = salary;
            recordContainer.appendChild(recordSalaryContainer);

            let recordHireDateContainer = document.createElement('h2');
            recordHireDateContainer.innerHTML = hireDate;
            recordContainer.appendChild(recordHireDateContainer);
            }
        clearContainer('right');
        displayLoading('right', 'Loading content...');

    }

})