"use client";

import { useState, useEffect } from "react";
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
      <div
        className={`px-4 py-1 rounded-xs max-w-32 transition-colors duration-200 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border relative z-10 ${person.name.includes("🐐") ? "hover:bg-purple-300 dark:hover:bg-purple-950" : ""}`}
      >
        {person.year ? (
          <span className="absolute rounded-full bg-yellow-50 dark:bg-purple-950 border border-yellow-300 dark:border-purple-700 size-6 top-0 right-0 -mr-2.5 -mt-2.5 flex items-center justify-center text-center font-medium text-xs">
            {person.year}
          </span>
        ) : (
          ""
        )}
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

interface PersonJSON {
  name: string;
  age?: number;
  year?: number;
  children?: PersonJSON[];
}

function parseJSON(obj: PersonJSON): Person {
  return new Person(
    obj.name,
    obj.age ?? obj.year ?? 0,
    obj.children ? obj.children.map(parseJSON) : [],
  );
}

function parseCSV(csv: string): Person[] {
  const rows = csv.trim().split(/\r?\n/);
  const header = rows[0].split(",");
  const data = rows.slice(1).map((row) => {
    const cols = row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
    const obj: Record<string, string> = {};
    header.forEach((h, i) => {
      obj[h.trim()] = cols[i]?.trim();
    });
    return obj;
  });
  const peopleMap: Record<string, Person> = {};
  data.forEach((p) => {
    peopleMap[p.name] = new Person(p.name, Number(p.age));
  });
  data.forEach((p) => {
    if (p.parent && peopleMap[p.parent]) {
      peopleMap[p.parent].children.push(peopleMap[p.name]);
    }
  });
  return data.filter((p) => !p.parent).map((p) => peopleMap[p.name]);
}

export default function Home() {
  const [ultraAncestors, setUltraAncestors] = useState<Person[]>([]);
  const [familyData, setFamilyData] = useState<Person[]>([]);

  useEffect(() => {
    fetch("/family/ultraAncestors.csv")
      .then((res) => res.text())
      .then((csv) => {
        setUltraAncestors(parseCSV(csv));
      });

    const parseMode = "csv";
    if (parseMode === "json") {
      fetch("/family/tree.json")
        .then((res) => res.json())
        .then((data) => {
          setFamilyData(data.map(parseJSON));
        });
    } else if (parseMode === "csv") {
      fetch("/family/tree.csv")
        .then((res) => res.text())
        .then((csv) => {
          setFamilyData(parseCSV(csv));
        });
    }
  }, []);

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
          <div className="flex flex-col items-center w-full pb-32 gap-8 mb-12">
            <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
              Ultra Ancestors
            </h2>

            <div className="flex gap-16 items-end">
              {ultraAncestors.map((person) => (
                <Node key={person.name} person={person} />
              ))}
            </div>

            <div className="relative w-full flex justify-center">
              <div className="absolute h-px bg-neutral-300 dark:bg-neutral-700 w-2/3" />
            </div>
          </div>

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
