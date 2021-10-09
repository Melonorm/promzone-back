import config from "./ormconfig";

const ormseedconfig = {
  ...config,
  migrations: [__dirname + '/common/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/common/seeds'
  }
}

export default ormseedconfig;