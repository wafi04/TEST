import { CardFriends } from "../../../components/ui/card/CardFreinds";

export function FreindsSection() {
  return (
    <div className="flex space-x-3 ">
      <CardFriends name="Al farrelee" isOnline={true} />
      <CardFriends name="Al-farrelee" isOnline={true} />
      <CardFriends name="Al-farrelee" isOnline={true} />
    </div>
  );
}

export function FreindsSectionLonger() {
  return (
    <div className="flex space-x-3 ">
      <CardFriends name="Al farrelee" isOnline={true} />
      <CardFriends name="Al-farrelee" isOnline={true} />
      <CardFriends name="Al-farrelee" isOnline={true} />
    </div>
  );
}
