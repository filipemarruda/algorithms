import random


class Person:
    def __init__(self, birth, death):
        self.birth = birth
        self.death = death


def getStartYear(people):
    startYear = 9999
    for person in people:
        if person.birth < startYear:
            startYear = person.birth
    return startYear


def getEndYear(people):
    endYear = 0
    for person in people:
        if person.death > endYear:
            endYear = person.death
    return endYear


def greatestPopulation(people):
    startYear = getStartYear(people)
    endYear = getEndYear(people)

    maxPopulation = 0
    maxPopulationYear = 0

    for year in range(startYear, endYear):
        population = 0
        for person in people:
            if person.birth <= year and person.death >= year:
                population += 1

        if population > maxPopulation:
            maxPopulation = population
            maxPopulationYear = year

    return maxPopulationYear


def createPeople():
    people = []
    for i in range(0, 1000):
        birth = random.randint(1900, 2000)
        death = random.randint(birth, 2000)
        people.append(Person(birth, death))
    return people


def main():
    people = createPeople()
    print("Greatest Population: " + str(greatestPopulation(people)))


main()
