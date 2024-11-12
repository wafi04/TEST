import { TeamMemberCard } from "../../../components/ui/card/CardFreinds";

export function TeamSection() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Sales Manager",
      avatar: "https://avatars.dicebear.com/api/avataaars/example.svg",
      performance: 75,
    },
    {
      name: "Jane Smith",
      role: "Marketing Lead",
      avatar: "https://avatars.dicebear.com/api/avataaars/example.svg",
      performance: 85,
    },
    {
      name: "Mike Johnson",
      role: "Product Manager",
      avatar: "https://avatars.dicebear.com/api/avataaars/example.svg",
      performance: 65,
    },
  ];

  return (
    <div className="flex w-full space-x-3   ">
      {teamMembers.map((member, index) => (
        <TeamMemberCard
          key={index}
          name={member.name}
          role={member.role}
          avatar={member.avatar}
          performance={member.performance}
        />
      ))}
    </div>
  );
}
