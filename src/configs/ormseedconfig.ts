import ormconfig from "./ormconfig";

const ormseedconfig = {
  ...ormconfig,
  migrations: ['dist/common/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/common/seeds'
  }
}

export default ormseedconfig;