import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { Comment } = prisma

export default {
    getAll(_req, res) {
        Comment.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la récupération des Commentaires',
                })
            })
    },
    get(req, res) {
        const { id } = req.params

        Comment.findUnique({ where: { id: parseInt(id) } })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Impossible de trouver commentaire avec lidentifiant=${id}`,
                      })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de commentaire avec lidentifiant=${id}`,
                })
            })
    },
    create(req, res) {
        prisma.comment
            .create({
                data: req.body,
            })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Une erreur sest produite lors de la création de commentaire',
                })
            })
    },
    update(req, res) {
        prisma.comment
            .update({
                where: { id: parseInt(req.params.id) },
                data: req.body,
            })
            .then(() => {
                res.status(200).send({
                    message: 'Commentaire a été mis à jour avec succès',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la récupération de commentaire avec lidentifiant=${id}`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        Comment.delete({
            where: {
                id: parseInt(id),
            },
        })
            .then(() => {
                res.status(200).send({
                    message: 'commentaire a été supprimé avec succès',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        `Une erreur sest produite lors de la suppression de commentaire avec lidentifiant=${id}`,
                })
            })
    },
}
