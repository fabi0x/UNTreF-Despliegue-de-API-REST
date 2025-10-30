const express = require("express");
const Actor = require("../models/Actor");
const Film = require("../models/Film");
const FilmActor = require("../models/FilmActor");

const router = express.Router();

/**
 * @swagger
 * /seed:
 *   post:
 *     summary: Poblar la base de datos con datos de prueba
 *     description: Crea actores, películas y relaciones entre ellos para pruebas
 *     responses:
 *       201:
 *         description: Base de datos poblada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 actorsCreated:
 *                   type: integer
 *                 filmsCreated:
 *                   type: integer
 *                 relationsCreated:
 *                   type: integer
 *       500:
 *         description: Error al poblar la base de datos
 */
router.post("/", async (req, res) => {
  try {
    // Datos de actores de prueba
    const actorsData = [
      { first_name: "Tom", last_name: "Hanks" },
      { first_name: "Meryl", last_name: "Streep" },
      { first_name: "Leonardo", last_name: "DiCaprio" },
      { first_name: "Scarlett", last_name: "Johansson" },
      { first_name: "Robert", last_name: "De Niro" },
      { first_name: "Morgan", last_name: "Freeman" },
      { first_name: "Brad", last_name: "Pitt" },
      { first_name: "Natalie", last_name: "Portman" },
      { first_name: "Johnny", last_name: "Depp" },
      { first_name: "Emma", last_name: "Stone" },
    ];

    // Datos de películas de prueba
    const filmsData = [
      {
        title: "Forrest Gump",
        description:
          "La vida es como una caja de chocolates, nunca sabes lo que te va a tocar.",
        release_year: 1994,
      },
      {
        title: "Inception",
        description:
          "Un ladrón que roba secretos corporativos mediante el uso de tecnología de sueños compartidos.",
        release_year: 2010,
      },
      {
        title: "The Shawshank Redemption",
        description:
          "Dos hombres encarcelados forjan una amistad a lo largo de varios años.",
        release_year: 1994,
      },
      {
        title: "Titanic",
        description:
          "Una historia de amor épica a bordo del fatídico viaje inaugural del Titanic.",
        release_year: 1997,
      },
      {
        title: "The Godfather",
        description:
          "El envejecido patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su hijo reacio.",
        release_year: 1972,
      },
      {
        title: "Pulp Fiction",
        description:
          "Las vidas de dos asesinos a sueldo de la mafia, un boxeador, un gánster y su esposa se entrelazan en cuatro historias de violencia y redención.",
        release_year: 1994,
      },
      {
        title: "The Dark Knight",
        description:
          "Cuando la amenaza conocida como el Joker emerge de su misterioso pasado, causa estragos y caos en la gente de Gotham.",
        release_year: 2008,
      },
      {
        title: "Fight Club",
        description:
          "Un trabajador de oficina insomne y un fabricante de jabón forman un club de lucha clandestino que evoluciona en algo mucho más.",
        release_year: 1999,
      },
      {
        title: "The Matrix",
        description:
          "Un hacker descubre que la realidad que conoce es una simulación creada por máquinas.",
        release_year: 1999,
      },
      {
        title: "Interstellar",
        description:
          "Un equipo de exploradores viajan a través de un agujero de gusano en el espacio para asegurar la supervivencia de la humanidad.",
        release_year: 2014,
      },
    ];

    // Crear actores
    const createdActors = await Actor.bulkCreate(actorsData);

    // Crear películas
    const createdFilms = await Film.bulkCreate(filmsData);

    // Crear relaciones entre actores y películas
    const relations = [
      // Forrest Gump - Tom Hanks, Morgan Freeman
      { actor_id: createdActors[0].actor_id, film_id: createdFilms[0].film_id },
      { actor_id: createdActors[5].actor_id, film_id: createdFilms[0].film_id },

      // Inception - Leonardo DiCaprio, Tom Hanks
      { actor_id: createdActors[2].actor_id, film_id: createdFilms[1].film_id },
      { actor_id: createdActors[0].actor_id, film_id: createdFilms[1].film_id },

      // The Shawshank Redemption - Morgan Freeman, Brad Pitt
      { actor_id: createdActors[5].actor_id, film_id: createdFilms[2].film_id },
      { actor_id: createdActors[6].actor_id, film_id: createdFilms[2].film_id },

      // Titanic - Leonardo DiCaprio, Emma Stone
      { actor_id: createdActors[2].actor_id, film_id: createdFilms[3].film_id },
      { actor_id: createdActors[9].actor_id, film_id: createdFilms[3].film_id },

      // The Godfather - Robert De Niro, Meryl Streep
      { actor_id: createdActors[4].actor_id, film_id: createdFilms[4].film_id },
      { actor_id: createdActors[1].actor_id, film_id: createdFilms[4].film_id },

      // Pulp Fiction - Brad Pitt, Scarlett Johansson
      { actor_id: createdActors[6].actor_id, film_id: createdFilms[5].film_id },
      { actor_id: createdActors[3].actor_id, film_id: createdFilms[5].film_id },

      // The Dark Knight - Leonardo DiCaprio, Johnny Depp
      { actor_id: createdActors[2].actor_id, film_id: createdFilms[6].film_id },
      { actor_id: createdActors[8].actor_id, film_id: createdFilms[6].film_id },

      // Fight Club - Brad Pitt, Robert De Niro
      { actor_id: createdActors[6].actor_id, film_id: createdFilms[7].film_id },
      { actor_id: createdActors[4].actor_id, film_id: createdFilms[7].film_id },

      // The Matrix - Natalie Portman, Emma Stone
      { actor_id: createdActors[7].actor_id, film_id: createdFilms[8].film_id },
      { actor_id: createdActors[9].actor_id, film_id: createdFilms[8].film_id },

      // Interstellar - Leonardo DiCaprio, Scarlett Johansson, Natalie Portman
      { actor_id: createdActors[2].actor_id, film_id: createdFilms[9].film_id },
      { actor_id: createdActors[3].actor_id, film_id: createdFilms[9].film_id },
      { actor_id: createdActors[7].actor_id, film_id: createdFilms[9].film_id },
    ];

    await FilmActor.bulkCreate(relations);

    res.status(201).json({
      message: "Base de datos poblada exitosamente con datos de prueba",
      actorsCreated: createdActors.length,
      filmsCreated: createdFilms.length,
      relationsCreated: relations.length,
    });
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    res.status(500).json({
      error: "No se pudo poblar la base de datos",
      details: error.message,
    });
  }
});

/**
 * @swagger
 * /seed:
 *   delete:
 *     summary: Limpiar toda la base de datos
 *     description: Elimina todos los registros de actores, películas y relaciones
 *     responses:
 *       200:
 *         description: Base de datos limpiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al limpiar la base de datos
 */
router.delete("/", async (req, res) => {
  try {
    // Eliminar todas las relaciones primero (debido a las llaves foráneas)
    await FilmActor.destroy({ where: {} });

    // Eliminar todos los actores
    await Actor.destroy({ where: {} });

    // Eliminar todas las películas
    await Film.destroy({ where: {} });

    res.status(200).json({
      message: "Base de datos limpiada exitosamente",
    });
  } catch (error) {
    console.error("Error al limpiar la base de datos:", error);
    res.status(500).json({
      error: "No se pudo limpiar la base de datos",
      details: error.message,
    });
  }
});

module.exports = router;
