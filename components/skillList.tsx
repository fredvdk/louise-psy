
interface skillProps {
    name: string;
    description: string;
}

function SkillList() {
    return (
        <div className="flex flex-col gap-6">
            <Skill name="Psychologe" description="Gediplomeerd psychologe met jarenlange ervaring in het begeleiden van cliënten naar een betere mentale gezondheid." />
            <Skill name="Therapeut" description="Gediplomeerd psychologe met jarenlange ervaring in het begeleiden van cliënten naar een betere mentale gezondheid." />
        </div>
    );
}


function Skill(skill: skillProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <p className="font-bold text-foreground">{skill.name}</p>
                <p className="text-muted-foreground">{skill.description}</p>
            </div>
        </div>
    );
}

export default SkillList;