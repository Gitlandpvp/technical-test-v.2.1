import { TorrePerson, SkillAnalysis, LocationAnalysis } from '@/types/torre';

export class Analytics {
  static analyzeSkills(people: TorrePerson[]): SkillAnalysis[] {
    const skillMap = new Map<string, { count: number; totalLevel: number }>();

    people.forEach(person => {
      person.skills?.forEach(skill => {
        const existing = skillMap.get(skill.name);
        if (existing) {
          existing.count += 1;
          existing.totalLevel += skill.level;
        } else {
          skillMap.set(skill.name, { count: 1, totalLevel: skill.level });
        }
      });
    });

    const totalPeople = people.length;
    const skillAnalysis: SkillAnalysis[] = Array.from(skillMap.entries())
      .map(([skill, data]) => ({
        skill,
        count: data.count,
        averageLevel: data.totalLevel / data.count,
        percentage: (data.count / totalPeople) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 skills

    return skillAnalysis;
  }

  static analyzeLocations(people: TorrePerson[]): LocationAnalysis[] {
    const locationMap = new Map<string, number>();

    people.forEach(person => {
      if (person.location?.name) {
        const location = person.location.name;
        locationMap.set(location, (locationMap.get(location) || 0) + 1);
      }
    });

    const totalPeople = people.length;
    const locationAnalysis: LocationAnalysis[] = Array.from(locationMap.entries())
      .map(([location, count]) => ({
        location,
        count,
        percentage: (count / totalPeople) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 locations

    return locationAnalysis;
  }

  static getTopSkills(people: TorrePerson[], limit: number = 5): string[] {
    const skillAnalysis = this.analyzeSkills(people);
    return skillAnalysis.slice(0, limit).map(skill => skill.skill);
  }

  static getExperienceLevel(person: TorrePerson): string {
    const totalExperience = person.experience?.reduce((total, exp) => {
      const startYear = exp.fromYear;
      const endYear = exp.toYear || new Date().getFullYear();
      return total + (endYear - startYear);
    }, 0) || 0;

    if (totalExperience < 2) return 'Junior';
    if (totalExperience < 5) return 'Mid-level';
    if (totalExperience < 10) return 'Senior';
    return 'Expert';
  }

  static getSkillMatch(person: TorrePerson, requiredSkills: string[]): number {
    if (!person.skills || requiredSkills.length === 0) return 0;

    const personSkillNames = person.skills.map(s => s.name.toLowerCase());
    const requiredSkillNames = requiredSkills.map(s => s.toLowerCase());
    
    const matches = requiredSkillNames.filter(skill => 
      personSkillNames.some(personSkill => personSkill.includes(skill) || skill.includes(personSkill))
    );

    return (matches.length / requiredSkills.length) * 100;
  }

  static generateRecommendations(people: TorrePerson[], targetPerson: TorrePerson): TorrePerson[] {
    if (!targetPerson.skills) return people.slice(0, 5);

    const targetSkills = targetPerson.skills.map(s => s.name);
    
    return people
      .filter(person => person.id !== targetPerson.id)
      .map(person => ({
        ...person,
        skillMatch: this.getSkillMatch(person, targetSkills)
      }))
      .sort((a, b) => (b as any).skillMatch - (a as any).skillMatch)
      .slice(0, 5);
  }
} 