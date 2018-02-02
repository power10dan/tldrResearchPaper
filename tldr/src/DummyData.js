import GradStudent from './Assets/Graduate_Student-512.png';
import Student from './Assets/student.png';
import Professor from './Assets/professor.svg';
import PostDoc from './Assets/postdoc.png';


export function DataSubscriptionDummyFunc(){
	let CustomizationAction = [
		{
			sectionLabel: "What type of researcher are you?",
			selectionContent: ["Professor", "Post-Doc", "Graduate Student", "Undergraduate Student"],
			selectionImage: [Professor, PostDoc, Student, Student]
		},
	]

	return CustomizationAction;
}

export function DataSubscriptionConference(){
	let ConferenceSubscription = {
			conferenceLabel: "Select your favorite conferences",
			conferences: ["OOPSLA", "SIGCHI", "POPL", "ICSE"],
			conferenceType: ["Programming Languages", 
							 "Human-Computer Interaction", 
							 "Programming Languages", 
							 "Software Engineering"],
			numPageSupported: [15, 24, 10, 13],
			description: [
							  "OOPSLA is my favorite conference because OOPSLA is cool",
							  "SIGCHI is my second favorite conference in human computer interaction",
							  "POPL is the best, it reminds me of Popye the sailorman",
							  "ICSE is just your average neighborhood friendly software engineering conference"
						 ],
			images: [ ]
	}
	
	return ConferenceSubscription;
}

