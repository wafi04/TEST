import { MoveRight } from "lucide-react";
import { ButtonHighlight } from "../../components/ui/button/ButtonHighlight";
import EachUtils from "../../utils/EachUtils";
//  categories section
export function Categories() {
  const data = [
    {
      name: "Running",
      image:
        "https://media.istockphoto.com/id/1468499033/photo/breathe-music-and-woman-running-in-the-street-for-fitness-training-and-marathon-in-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=JXPrYhUWkx4Jtw3SVvKePDs5V-VR-P5DlWOjKfMZfW0=",
    },
    {
      name: "Basketball",
      image:
        "https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Football",
      image:
        "https://images.unsplash.com/photo-1661282490410-4023ca233fc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm90YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <section className=" p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <EachUtils
        of={data}
        render={(item) => (
          <div key={item.name} className="relative">
            <img
              src={item.image as string}
              alt="/"
              width={500}
              height={500}
              className="h-[70vh] object-cover w-full"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-10">
              <ButtonHighlight className="">
                <p className="font-sans">{item.name}</p>
                <MoveRight />
              </ButtonHighlight>
            </div>
          </div>
        )}
      />
    </section>
  );
}
