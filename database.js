module.exports = {
    selectCites: "select cites.id as id, cites.name as city, regions.name as region from cites left join regions ON (regions.id = cites.id_region)",
    selectAttrs: "select name, required from options",
    selectRegions: "select name from regions",
    selectOptions: (id_city, id_option) => {
        return (`
          select options.name, value from options_values
          join cites ON (cites.id = options_values.id_city) 
          join options ON (options.id = options_values.id_option) 
          where id_city = ${id_city} and id_option = ${id_option}`
        );
    },
};