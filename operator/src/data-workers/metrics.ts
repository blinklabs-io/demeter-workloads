import type { CustomResource, DataWorker } from "@demeter-run/workloads-types";
import { collectWorkloadMetrics } from "../metrics/project";
import { loadProjectInstances } from "../metrics/shared";
import { API_GROUP, API_VERSION, PLURAL } from "./constants";
import { listResourcePods } from "./handlers";


async function collectCustomExtensionsMetrics() {
  // @TODO paginate this query
  const instances = await loadProjectInstances(API_GROUP, API_VERSION, PLURAL) as CustomResource<DataWorker.Spec, DataWorker.Status>[];

  for (const instance of instances) {
    await collectWorkloadMetrics(instance, listResourcePods);
  }
}

export async function collectClusterMetrics() {
  await collectCustomExtensionsMetrics();
}