import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { config } from 'dotenv'

const prisma = new PrismaClient()
function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)

    const item = arr[randomIndex]

    return item
}
async function clear() {
    await prisma.Comment.deleteMany({})

    await prisma.category.deleteMany({})
    await prisma.Article.deleteMany({})
    await prisma.user.deleteMany({})
}

const fakerAuthors = () => ({
    name: faker.name.firstName() + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(15),
    role: 'AUTHOR',
})

const fakerAdmins = () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(15),
    role: 'ADMIN',
})

const getRandomCategory = async () => {
    const categories = await prisma.category.findMany({})
    const randomcategory = categories[Math.floor(Math.random() * categories.length)]
    return randomcategory
}

const getRandomUser = async () => {
    const Utilisateurs = await prisma.user.findMany({})
    const randomUser = Utilisateurs[Math.floor(Math.random() * Utilisateurs.length)]
    return randomUser
}

const fakerArticles = async () => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    image: getRandomItem([
        faker.image.sports(),
        faker.image.technics(),
        faker.image.transport(),
        faker.image.people(),
        faker.image.nightlife(),
        faker.image.nature(),
        faker.image.imageUrl(),
        faker.image.image(),
        faker.image.food(),
        faker.image.fashion(),
        faker.image.city(),
        faker.image.cats(),
        faker.image.business(),
        faker.image.avatar(),
        faker.image.animals(),
    ]),
    createdAt: faker.date.between('2022-01-01', '2022-04-29'),
    updatedAtn: faker.date.between('2022-05-01', '2022-05-29'),
    published: true,
    userId: parseInt((await getRandomUser()).id),
})

const fakerComments = (artId) => ({
    contenu: faker.lorem.paragraph(),
    email: faker.internet.email(),
    articleId: artId,
})

async function main() {
    const fakerAuthorsRounds = 10
    const fakerAdminsRounds = 1
    const fakerCategoriesRounds = 10
    const fakerArticlesRounds = 100
    config()
    console.log('Seeding.')
    await clear()

    for (let i = 0; i < fakerAuthorsRounds; i++) {
        await prisma.user.create({ data: fakerAuthors() })
    }

    for (let i = 0; i < fakerAdminsRounds; i++) {
        await prisma.user.create({ data: fakerAdmins() })
    }

    const fakeCategories = []
    while (fakeCategories.length !== fakerCategoriesRounds) {
        const newCategory = faker.commerce.department()
        if (!fakeCategories.includes(newCategory)) fakeCategories.push(newCategory)
    }
    for (let i = 0; i < fakeCategories.length; i++) {
        await prisma.Category.create({ data: { name: fakeCategories[i] } })
    }

    for (let i = 0; i < fakerArticlesRounds; i++) {
        await prisma.Article.create({ data: await fakerArticles() })
    }
    console.log('Seeding..')
    const articles = await prisma.Article.findMany()
    const categories = await prisma.Category.findMany()
    console.log('Seeding...')

    for (let i = 0; i < articles.length; i++) {
        const numberOfComments = Math.floor(Math.random() * 20)
        for (let j = 0; j < numberOfComments; j++) {
            await prisma.Comment.create({ data: fakerComments(articles[i].id) })
        }
    }
    console.log('Seeding finished')
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
