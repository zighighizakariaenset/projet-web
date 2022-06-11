import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { Article, comment } = prisma

export default {
    getAll(_req, res) {
        Article.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la récupération des articles',
                })
            })
    },
    get(req, res) {
        const { id } = req.params

        Article.findUnique({ where: { id: parseInt(id) } })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Impossible de trouver larticle avec lidentifiant=${id}`,
                      })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de larticle avec lidentifiant=${id}`,
                })
            })
    },
    create(req, res) {
        prisma.article
            .create({
                data: req.body,
            })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la création de larticle',
                })
            })
    },
    update(req, res) {
        prisma.article
            .update({
                where: { id: parseInt(req.params.id) },
                data: req.body,
            })
            .then(() => {
                res.status(200).send({
                    message: 'Larticle a été mis à jour avec succès',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de larticle avec lidentifiant=${id}`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        const deletecomments = comment.deleteMany({
            where: {
                articleId: parseInt(id),
            },
        })
        const deleteArticle = Article.delete({
            where: {
                id: parseInt(id),
            },
        })

        prisma
            .$transaction([deletecomments, deleteArticle])
            .then(() => {
                res.status(200).send({
                    message: 'Larticle a été supprimé avec succès',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la suppression de larticle avec lidentifiant=${id}`,
                })
            })
    },
}
