import Student from './Assets/student.png';
import Professor from './Assets/professor.svg';
import PostDoc from './Assets/postdoc.png';
import CHI from './Assets/CHI.png';
import PL from './Assets/smallPopl.png';

export function DataSubscriptionDummyFunc(){
	let CustomizationAction = [
		{
			sectionLabel: "What type of researcher are you?",
			selectionContent: ["Professor", "Post-Doc", "Graduate Student", "Undergraduate Student"],
			selectionImage: [ Professor, PostDoc, Student, Student]
		},
	]

	return CustomizationAction;
}

export function DataSubscriptionConference(){
	let ConferenceSubscription = {
		conferenceLabel: "Select your favorite conferences",
		conferences: ["OOPSLA", "SIGCHI", "POPL", "ICSE"],
		conferenceImage: [PL, CHI, PL, CHI],
		conferenceType: ["Programming Languages", 
						 "Human-Computer Interaction", 
						 "Programming Languages", 
						 "Software Engineering"],
		numPageSupported: [15, 24, 10, 13],
		description: [
					  "OOPSLA (Object-Oriented Programming, Systems, Languages & Applications) is an annual ACM research conference. OOPSLA mainly takes place in the United States,  while the sister conference of OOPSLA, ECOOP, is typically held in Europe. `It is operated by the Special Interest Group for Programming Languages (SIGPLAN) group of `the Association for Computing Machinery (ACM).",
					  "Special Interest Group on Computer–Human Interaction (SIGCHI) is the one of the Association for Computing Machinery's special interest groups which is focused on human–computer interactions (HCI).t hosts the major annual international HCI conference, CHI, with around 2,500 attendees, and publishes ACM Interactions and ACM Transactions on Computer-Human Interaction (TOCHI).",
					  "The annual Symposium on Principles of Programming Languages is a forum for the discussion of all aspects of programming languages and programming systems. Both theoretical and experimental papers are welcome, on topics ranging from formal frameworks to experience reports. We seek submissions that make principled, enduring contributions to the theory, design, understanding, implementation or application of programming languages.",
					  "ICSE, the International Conference on Software Engineering, is the premier software engineering conference, providing a forum for researchers, practitioners and educators to present and discuss the most recent innovations, trends, experiences and concerns in the field of software engineering."
					 ],
		images: [ ]
	}
	
	return ConferenceSubscription;
}