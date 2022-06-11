import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { User, Article } = prisma

export default {
    getAll(_req, res) {
        User.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la récupération des users',
                })
            })
    },
    get(req, res) {
        const { id } = req.params

        User.findUnique({ where: { id: parseInt(id) } })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Impossible de trouver user avec lidentifiant=${id}`,
                      })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de user avec lidentifiant=${id}`,
                })
            })
    },

    create(req, res) {
        prisma.user
            .create({
                data: req.body,
            })

            .then((data) => {
                res.status(201).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la création de user',
                })
            })
    },
    update(req, res) {
        prisma.user
            .update({
                where: { id: parseInt(req.params.id) },
                data: req.body,
            })
            .then(() => {
                res.status(200).send({
                    message: 'User a été mis à jour avec succès',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de user avec lidentifiant=${id}`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        const deleteArticles = Article.deleteMany({
            where: {
                userId: parseInt(id),
            },
        })
        const deleteUser = User.delete({
            where: {
                id: parseInt(id),
            },
        })

        prisma
            .$transaction([deleteArticles, deleteUser])
            .then(() => {
                res.status(200).send({
                    message: 'User a été supprimé avec succèsy',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la suppression de user avec lidentifiant==${id}`,
                })
            })
    },
}
