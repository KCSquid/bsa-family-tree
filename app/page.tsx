"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

class Person {
  name: string;
  year: number;
  children: Person[];

  constructor(name: string, year: number, children?: Person[]) {
    this.name = name;
    this.year = year;
    this.children = children ?? [];
  }
}

function Node({ person }: { person: Person }) {
  return (
    <div className="flex flex-col items-center">
      <div className="px-4 py-1 rounded-xs max-w-32 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border relative z-10">
        <span className="absolute rounded-full bg-yellow-50 dark:bg-purple-950 border border-yellow-300 dark:border-purple-700 size-6 top-0 right-0 -mr-2.5 -mt-2.5 flex items-center justify-center text-center font-medium text-xs">
          {person.year}
        </span>
        <p className="text-center">{person.name}</p>
      </div>

      {person.children.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />

          <div className="flex">
            {person.children.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === person.children.length - 1;

              return (
                <div
                  key={child.name}
                  className="flex flex-col items-center relative pt-4"
                >
                  {person.children.length > 1 && (
                    <div
                      className={`absolute top-0 h-px bg-neutral-300 dark:bg-neutral-700
                        ${isFirst ? "left-1/2 right-0" : ""} 
                        ${isLast ? "left-0 right-1/2" : ""}
                        ${!isFirst && !isLast ? "left-0 right-0" : ""}
                      `}
                    />
                  )}

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-neutral-300 dark:bg-neutral-700" />

                  <div className="px-2">
                    <Node person={child} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const familyData = [
    new Person("Danielle", 23, [
      new Person("Angel", 24, [
        new Person("Denessa", 25),
        new Person("Maabena", 25, [
          new Person("Direnzo", 26),
          new Person("Xzavier", 26, [
            new Person("Josh", 28, [
              new Person("Zach", 29),
              new Person("Sam", 29),
            ]),
          ]),
          new Person("Halo", 27),
          new Person("Ge'hailey", 27),
          new Person("Christina", 26),
          new Person("Jahvon", 27, [
            new Person("Jonathan", 29, [
              new Person("Kai", 30),
              new Person("Kumar", 30),
            ]),
          ]),
        ]),
        new Person("Khandea", 25),
        new Person("Krystal", 25),
      ]),
      new Person("Amelia", 24),
    ]),
    new Person("Ezekiel", 25),
    new Person("Nana", 23),
    new Person("Vasean", 23, [
      new Person("Amir", 26),
      new Person("Jayden H.", 25, [
        new Person("Mudassar", 27, [new Person("Kyle", 27)]),
        new Person("Kaiden", 27),
      ]),
    ]),
    new Person("Jesse", 25, [
      new Person("Kayden", 28),
      new Person("Isaiah", 28),
      new Person("Nate", 27, [
        new Person("Paige", 28),
        new Person("Mikael", 28),
        new Person("Jacoho", 29),
        new Person("Thurun", 29),
        new Person("Salt", 29),
      ]),
    ]),
    new Person("O'shane", 23, [
      new Person("Toyeb", 25),
      new Person("Antwon", 25),
      new Person("Malik", 25),
      new Person("Zyon", 25),
      new Person("Jordan", 25, [
        new Person("Josias", 27),
        new Person("Elias", 27, [
          new Person("Dylan", 28),
          new Person("Mansoor", 28),
          new Person("Josiah", 28),
          new Person("Mueez", 28),
          new Person("Ecclesia", 28),
        ]),
        new Person("Jahleel", 27),
        new Person("Francais", 27),
        new Person("Clifford", 27, [
          new Person("Kai", 28),
          new Person("Komal", 27),
          new Person("Brendon", 28),
        ]),
      ]),
    ]),
    new Person("Jayden C.", 25),
    new Person("Micaih", 23, [
      new Person("Caleb", 23, [new Person("Jared", 26)]),
    ]),
    new Person("Jermadeen", 25, [
      new Person("Brianna", 27),
      new Person("Akeema", 27),
      new Person("Dejanae", 26),
    ]),
  ];

  return (
    <div className="w-screen h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden font-sans text-black dark:text-white">
      <h1 className="absolute left-0 m-4 font-semibold text-sm">
        BSA Family Tree
      </h1>
      <h1 className="absolute right-0 m-4 font-semibold text-sm">
        Chinguacousy SS
      </h1>
      <h1 className="z-10 absolute bottom-0 left-0 m-4 font-medium text-sm flex gap-1 max-w-64 flex-wrap">
        Made by
        <a
          className="text-pink-700 dark:text-purple-300 hover:-translate-y-0.5 w-fit block cursor-pointer transition duration-300"
          href="https://kcsquid.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jahvon C.,
        </a>
        Ben Smith, & various members.
      </h1>
      <h1 className="absolute bottom-0 right-0 m-4 font-semibold text-sm">
        February 27, 2026
      </h1>
      <TransformWrapper
        initialScale={0.8}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.25}
        maxScale={2}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: false }}
      >
        <TransformComponent
          wrapperClass="!w-screen !h-screen cursor-grab active:cursor-grabbing"
          contentClass="p-[500px]"
        >
          <div className="flex gap-20 items-start px-8">
            {familyData.map((person) => (
              <Node key={person.name} person={person} />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
