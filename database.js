module.exports = {
    selectCites: "select cites.id as id, cites.name as city, regions.name as region from cites left join regions ON (regions.id = cites.id_region)",
    selectAttrs: "select name, required from options",
    selectRegions: "select id, name from regions",
    selectOptions: (id_city) => (`
        select options_values.id, options.name, options_values.value from options_values
        join cites ON (cites.id = options_values.id_city) 
        join options ON (options.id = options_values.id_option) 
        where id_city = ${id_city}
      `),
    selectOptionID: (name) => `select id from options where name = ${name}`,
    selectRegion: (name) => (`select id from regions where name='${name}'`),
    deleteCity: (id) => (`delete from options_values where id_city = ${id}; delete from cites where id = ${id}`),
    deleteAttr: (id) => (`delete from options_values where id_option = ${id}; delete from options where id = ${id}`),
    changeAttr: (id, data) => (`update options_values set value = '${data.value}' where id = ${id}`),
    changeCity: (id, name, id_region) => (`update cites set name = '${name}', id_region = ${id_region} where id = ${id}`),
    createRegion: (name) => (`insert into regions(name) values('${name}')`),
    createOptionalOptions: (name) => (`
        insert into options(name, required) values(${name}, false);
      `),
    createOptionalOptionsValue: (id_city, id_option, value) => (`
        insert into options_values(id_city, id_option, value) values(${id_city}, ${id_option}, '${value}')
      `),
};