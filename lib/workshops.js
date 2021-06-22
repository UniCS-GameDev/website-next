import fs from 'fs'
import path from 'path'

const workshopRoot = 'workshops';
const workshopIndexFilename = 'index.json';
const tutorialFilenameRegex = /\.json$/;

function slugifyWorkshop(name) {
    return name.toLowerCase().replace(' ', '-');
}

export function getAllWorkshops() {
    function containsIndex(files) {
        return files.includes(workshopIndexFilename);
    }

    function filterTutorials(files) {
        return files.filter((v, i, _) => {
            return tutorialFilenameRegex.test(v) && v !== workshopIndexFilename;
        });
    }

    const workshops = fs.readdirSync(workshopRoot).filter((dir) => {
        const workshopPath = path.join(workshopRoot, dir);

        const files = fs.readdirSync(workshopPath);

        return containsIndex(files) && filterTutorials(files).length > 0;
    }).map((dir) => {
        const workshopPath = path.join(workshopRoot, dir);
        const workshopIndexPath = path.join(workshopRoot, dir, workshopIndexFilename);

        const files = fs.readdirSync(workshopPath);

        return {
            slug: slugifyWorkshop(dir),
            path: workshopPath,
            details: JSON.parse(fs.readFileSync(workshopIndexPath, 'utf8')),
            tutorialCount: filterTutorials(files).length
        };
    });

    return workshops;
}

function slugifyTutorial(name) {
    return name.toLowerCase().replace(tutorialFilenameRegex, '').replace(' ', '-');
}

export function getAllTutorials(workshopSlug) {
    const workshops = getAllWorkshops();

    const workshop = workshops.find((v, i, obj) => {
        return v.slug === workshopSlug;
    });

    if (workshop === undefined) {
        console.log(`Couldn't find any workshops with slug: '${workshopSlug}'`);
        return [];
    }

    const tutorials = fs.readdirSync(workshop.path).filter((file) => {
        return tutorialFilenameRegex.test(file) && file !== workshopIndexFilename;
    }).map((file) => {
        const tutorialPath = path.join(workshop.path, file);
        const tutorialDetails = fs.statSync(tutorialPath);

        return {
            slug: slugifyTutorial(file),
            created: tutorialDetails.birthtime.toLocaleString(),
            edited: tutorialDetails.atime.toLocaleString(),
            details: JSON.parse(fs.readFileSync(tutorialPath, 'utf8'))
        };
    });

    return tutorials;
}