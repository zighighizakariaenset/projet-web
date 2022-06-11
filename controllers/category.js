import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { Category } = prisma

export default {
    getAll(_req, res) {
        Category.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la récupération des catégories',
                })
            })
    },
    get(req, res) {
        const { id } = req.params

        Category.findUnique({ where: { id: parseInt(id) } })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Impossible de trouver catégorie avec lidentifiant=${id}`,
                      })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de catégorie avec lidentifiant=${id}`,
                })
            })
    },
    create(req, res) {
        prisma.category
            .create({
                data: req.body,
            })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la création de catégorie',
                })
            })
    },
    update(req, res) {
        prisma.category
            .update({
                where: { id: parseInt(req.params.id) },
                data: req.body,
            })
            .then(() => {
                res.status(200).send({
                    message: 'Catégorie a été mis à jour avec succès',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de catégorie avec lidentifiant=${id}`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        Category.delete({
            where: {
                id: parseInt(id),
            },
        })
            .then(() => {
                res.status(200).send({
                    message: 'catégorie a été supprimée avec succès',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la suppression de catégorie avec lidentifiant=${id}`,
                })
            })
    },
}
