import fs from 'fs';
import path from 'path';

export interface IStep extends IContent {
  body: string
}

export interface IHead extends IContent { }

export interface IInfo extends IContent {
  body: (IStep | IHead)[]
}

export interface IContent {
  type: string
  title: string,
}

export interface ITutorialDetails {
  title: string,
  description: string,
  thumbnail: string,
  videoUrl: string,
  tableOfContents: string[],
  contents: (IInfo | IHead | IStep)[]
}

export interface ITutorial {
  slug: string,
  created: string,
  edited: string,
  details: ITutorialDetails
}

export interface IWorkshopDetails {
  title: string,
  intro: string,
  description: string,
  prerequisites: string[],
  taught: string[],
  thumbnail: string
}

export interface IWorkshop {
  slug: string,
  path: string,
  details: IWorkshopDetails,
  tutorialCount: number
}

const workshopRoot = 'workshops';
const workshopIndexFilename = 'index.json';
const tutorialFilenameRegex = /\.json$/;

function slugifyWorkshop(name: string): string {
  return name.toLowerCase().replace(' ', '-');
}

function slugifyTutorial(name: string): string {
  return name.toLowerCase().replace(tutorialFilenameRegex, '').replace(' ', '-');
}

function filterTutorials(files: string[]): string[] {
  return files.filter((v) => tutorialFilenameRegex.test(v) && v !== workshopIndexFilename);
}

export function getAllWorkshops(): IWorkshop[] {
  function containsWorkshopIndex(files: string[]): boolean {
    return files.includes(workshopIndexFilename);
  }

  const workshops = fs.readdirSync(workshopRoot, { withFileTypes: true }).filter((dir) => {
    if (!dir.isDirectory()) return false;

    const workshopPath = path.join(workshopRoot, dir.name);
    const files = fs.readdirSync(workshopPath);

    return containsWorkshopIndex(files) && filterTutorials(files).length > 0;
  }).map((dir) => {
    const workshopPath = path.join(workshopRoot, dir.name);
    const workshopIndexPath = path.join(workshopRoot, dir.name, workshopIndexFilename);

    return {
      slug: slugifyWorkshop(dir.name),
      path: workshopPath,
      details: JSON.parse(fs.readFileSync(workshopIndexPath, 'utf8')) as IWorkshopDetails,
      tutorialCount: filterTutorials(fs.readdirSync(workshopPath)).length,
    };
  });

  return workshops;
}

export function getAllTutorials(workshopSlug: string): ITutorial[] {
  const workshops = getAllWorkshops();

  const workshop = workshops.find((v) => v.slug === workshopSlug);

  if (workshop === undefined) {
    return [];
  }

  const tutorials = filterTutorials(fs.readdirSync(workshop.path)).map((file) => {
    const tutorialPath = path.join(workshop.path, file);
    const tutorialDetails = fs.statSync(tutorialPath);

    return {
      slug: slugifyTutorial(file),
      created: tutorialDetails.birthtime.toLocaleString(),
      edited: tutorialDetails.atime.toLocaleString(),
      details: JSON.parse(fs.readFileSync(tutorialPath, 'utf8')) as ITutorialDetails,
    };
  });

  return tutorials;
}
