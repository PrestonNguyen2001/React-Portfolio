import React from "react";
import { gridItems } from "../../data/index";
import { BentoGrid, BentoGridItem } from "../Grid/BentoGrid";

const Interests = () => {
  return (
    <section id="interests">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
            component={item.component} // Pass the component prop
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Interests;
