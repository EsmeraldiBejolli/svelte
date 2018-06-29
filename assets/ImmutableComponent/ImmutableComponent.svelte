<h1>{ headline }</h1>

<script>
    import { Map } from 'immutable';

    export default {
        data() {
            return {
                headline: 'wellcome to my Immutable component'
            }
        },
        oncreate() {
            const myStudent = Map({
                student: {
                    name: 'Esmeraldi',
                    age: 26,
                    parent: {
                        name: 'Niko',
                        surename: 'Bejolli'
                    }
                }
            })
            this.set({student: myStudent});

            const student = myStudent.get('student');
            console.log(myStudent.get('student'));

            const student2 = student; 
            // student2 = student.parent.name = 'he is not my dad';
            console.log(myStudent.get('student'));

            const student3 = student2;
            // student.parent.name = 'he is not my dad because I changed twice';
            console.log(myStudent.get('student'));

            
            student.name = 'I tried to change my name';
            console.log(myStudent.get('student'));
        },
        methods: {

        },
    };
</script>